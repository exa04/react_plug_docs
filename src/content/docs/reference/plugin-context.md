---
title: PluginContext
description: Context about the plugin for the GUI.
---

The PluginContext is a React context that provides information about the plugin to the GUI. It is automatically provided by the `react-plug` framework, and can be accessed by any component in the GUI.

```tsx
import { usePluginContext } from "react-plug";

function MyComponent() {
  const ctx = usePluginContext();

  return <div></div>;
}
```

The PluginContext provides the following information:

## Parameters

See [Parameters (TS)](./parameters-ts) for more information.

## sendToPlugin

Sends a message to the plugin. Messages must be defined in the plugin code.

```tsx
ctx.sendToPlugin("my-message", { foo: "bar" });
```

## addMessageListener

## removeMessageListener
