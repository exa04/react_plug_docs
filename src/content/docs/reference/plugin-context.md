---
title: PluginContext
description: Context about the plugin for the GUI.
---

The PluginContext is a React context that provides information about the plugin to the GUI. It is automatically provided by the `react-plug` framework, and can be accessed by any component in the GUI.

```tsx "usePluginContext"
import { usePluginContext } from "react-plug";

function MyComponent() {
  const ctx = usePluginContext();

  return <div></div>;
}
```

The PluginContext provides the following information:

## Parameters

See [Parameters (TS)](../parameters-ts) for more information.

## sendToPlugin

Sends a message to the plugin. Messages must be defined in the plugin code.

```tsx "sendToPlugin"
import { usePluginContext } from "react-plug";

function MyComponent() {
  const ctx = usePluginContext();

  return <button onClick={() => ctx.sendToPlugin("Ping")}>Send Ping</button>;
}
```

## addMessageListener

Adds a listener for messages from the plugin.

```tsx "addMessageListener"
import { usePluginContext } from "react-plug";

function MyComponent() {
  const ctx = usePluginContext();

  const [pongCount, setPongCount] = useState(0);

  useEffect(() => {
    const handler = (message: PluginMessage) => {
      if (message === "Pong") setPongCount((prevCount) => prevCount + 1);
    };

    ctx.addMessageListener(handler);

    return () => ctx.removeMessageListener(handler);
  }, [ctx]);

  return <div>Pong count: {pongCount}</div>;
}
```

## removeMessageListener

Removes a listener for messages from the plugin.

```tsx "removeMessageListener"
import { usePluginContext } from "react-plug";

function MyComponent() {
  const ctx = usePluginContext();

  const [pongCount, setPongCount] = useState(0);

  useEffect(() => {
    const handler = (message: PluginMessage) => {
      if (message === "Pong") setPongCount((prevCount) => prevCount + 1);
    };

    ctx.addMessageListener(handler);

    return () => ctx.removeMessageListener(handler);
  }, [ctx]);

  return <div>Pong count: {pongCount}</div>;
}
```
