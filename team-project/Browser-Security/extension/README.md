# Extension

Steps to run:

1. Run the server
2. Load the extension into Chrome via `chrome://extensions` with Developer mode enabled
3. The extension should register itself with the server automatically on install
4. Get the generated targetId with `curl http://localhost:9000/targets`
5. Use the `targetId` to send a execution request

```
POST http://localhost:9000/executions

{
	"targetId": "8c2c3c7d43cb8bb2b2d55f84d8f6b0b5",
	"payload": {
		"script": "YWxlcnQoJ2ZvbycpOyBbMys0XQo=",
		"type": "content",
		"urls": [
			"https://www.facebook.com/"
		]
	}
}
```

The `payload.urls` field will be used to limit script execution to specific website. If `payload.urls` is omitted, the script will run on all currently open tabs.
