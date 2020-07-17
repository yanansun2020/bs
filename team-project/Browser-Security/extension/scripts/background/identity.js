const fpKey = "_fp";
const fdKey = "_fd";
function generateKey() {
  return new Promise(resolve => {
    console.log("Generating and storing unique fingerprint ID");
    Fingerprint2.get(function(components) {
      var values = components.map(function(component) {
        return component.value;
      });
      var murmur = Fingerprint2.x64hash128(values.join(""), 31);
      chrome.storage.local.set(
        { _fp: murmur, _fd: JSON.stringify(components) },
        () => {
          console.log(`saved storage: ${fpKey}=${murmur}`);
          resolve({
            id: murmur,
            profile: components
          });
        }
      );
    });
  });
}

function initFingerprint() {
  return new Promise(resolve => {
    chrome.storage.local.get([fpKey], items => {
      if (
        chrome.runtime.lastError !== undefined &&
        items[fpKey] !== undefined
      ) {
        console.log(
          "No error and has value, retrieving existing fingerprintId"
        );
        console.log(items[fpKey]);
        resolve({
          id: items[fpKey],
          profile: JSON.parse(items[fdKey])
        });
      } else {
        generateKey().then(data => resolve(data));
      }
    });
  });
}
