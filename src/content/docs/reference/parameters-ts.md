---
title: Parameters (TS)
description: Parameters inside your React code.
---

In React-Plug, parameters are defined in Rust, and they are automatically available in your React GUI. You can use your parameters in your React code by
using the plugin context and accessing the `parameters` field.

```tsx "parameters"
import { usePluginContext } from "./bindings/PluginProvider";

function App() {
  const params = usePluginContext().parameters;

  return <div></div>;
}

export default App;
```

## FloatParam

A parameter whose value is a floating-point number.

### id

`string`

The ID of the parameter.

```tsx "gain.id"
import { usePluginContext } from "./bindings/PluginProvider";

function App() {
  const ctx = usePluginContext();
  const gain = ctx.parameters.gain;

  return <div>{gain.id}</div>;
}

export default App;
```

### name

`string`

The name of the parameter.

```tsx "gain.name"
import { usePluginContext } from "./bindings/PluginProvider";

function App() {
  const ctx = usePluginContext();
  const gain = ctx.parameters.gain;

  return (
    <div>
      {gain.name}: {gain.value}
    </div>
  );
}

export default App;
```

### value

`string`

The current value of the parameter, formatted by the [value_to_string](/reference/parameters-rust/#value_to_string) function passed to the parameters, if present.

```tsx "gain.value"
import { usePluginContext } from "./bindings/PluginProvider";

function App() {
  const ctx = usePluginContext();
  const gain = ctx.parameters.gain;

  return (
    <div>
      {gain.name}: {gain.value}
    </div>
  );
}

export default App;
```

### defaultValue

`number`

The default value of the parameter.

**Example:** Setting the value of a parameter to its default value.

```tsx "gain.defaultValue"
import { usePluginContext } from "./bindings/PluginProvider";

function App() {
  const ctx = usePluginContext();
  const gain = ctx.parameters.gain;

  return (
    <button onClick={() => gain.setValue(gain.defaultValue)}>Reset</button>
  );
}

export default App;
```

### rawValue

`number`

The raw value of the parameter, directly taken from the plugin.

```tsx "gain.rawValue"
import { usePluginContext } from "./bindings/PluginProvider";

function App() {
  const ctx = usePluginContext();
  const gain = ctx.parameters.gain;

  return (
    <div>
      {gain.name}: {gain.rawValue}
    </div>
  );
}

export default App;
```

### setValue

`function(value: number): void`

Sets the value of the parameter.

**Example:** Setting the value of a parameter to its default value.

```tsx "gain.setValue"
import { usePluginContext } from "./bindings/PluginProvider";

function App() {
  const ctx = usePluginContext();
  const gain = ctx.parameters.gain;

  return (
    <button onClick={() => gain.setValue(gain.defaultValue)}>Reset</button>
  );
}

export default App;
```

### formatter

`Formatter<number>`

Internally used to format the value of the parameter.

### range

`Range`

The range of the parameter. Can be any `Range`, analogously to the nih_plug
ranges. A range has the following methods:

- `normalize(value: number): number` - Normalizes a value to the range [0, 1]
- `unnormalize(value: number): number` - Unnormalizes a value from the range [0, 1]
- `getMin: () => number` - Returns the minimum value of the range
- `getMax: () => number` - Returns the maximum value of the range
- `clamp(n: number): number` - Clamps a value to the range

**Example:** Creating a range input for a parameter.

```tsx "gain.range"
import { usePluginContext } from "./bindings/PluginProvider";

function App() {
  const ctx = usePluginContext();
  const gain = ctx.parameters.gain;

  return (
    <input
      type="range"
      className="slider"
      min={0}
      max={1}
      step={0.001}
      value={gain.range.normalize(gain.rawValue)}
      onChange={(e) => {
        gain.setValue(gain.range.unnormalize(Number(e.target.value)));
      }}
    />
  );
}

export default App;
```

### Optional fields

These fields are optional and may not be present in all parameters.

#### unit

`string`

The unit of the parameter.

```tsx "gain.unit"
import { usePluginContext } from "./bindings/PluginProvider";

function App() {
  const ctx = usePluginContext();
  const gain = ctx.parameters.gain;

  return (
    <div>
      {gain.name}: {gain.value} {gain.unit}
    </div>
  );
}

export default App;
```

#### stepSize

`number`

The step size of the parameter.

```tsx "gain.stepSize"
import { usePluginContext } from "./bindings/PluginProvider";

function App() {
  const ctx = usePluginContext();
  const gain = ctx.parameters.gain;

  return (
    <input
      type="range"
      className="slider"
      min={gain.range.getMin()}
      max={gain.range.getMax()}
      step={gain.stepSize}
      value={gain.value}
      onChange={(e) => {
        gain.setValue(Number(e.target.value));
      }}
    />
  );
}

export default App;
```

## IntParam

A parameter whose value is an integer.

### id

`string`

The ID of the parameter.

```tsx "voices.id"
import { usePluginContext } from "./bindings/PluginProvider";

function App() {
  const ctx = usePluginContext();
  const voices = ctx.parameters.voices;

  return <div>{voices.id}</div>;
}

export default App;
```

### name

`string`

The name of the parameter.

```tsx "voices.name"
import { usePluginContext } from "./bindings/PluginProvider";

function App() {
  const ctx = usePluginContext();
  const voices = ctx.parameters.voices;

  return (
    <div>
      {voices.name}: {voices.value}
    </div>
  );
}

export default App;
```

### value

`string`

The current value of the parameter, formatted by the [value_to_string](/reference/parameters-rust/#value_to_string) function passed to the parameters, if present.

```tsx "voices.value"
import { usePluginContext } from "./bindings/PluginProvider";

function App() {
  const ctx = usePluginContext();
  const voices = ctx.parameters.voices;

  return (
    <div>
      {voices.name}: {voices.value}
    </div>
  );
}

export default App;
```

### defaultValue

`number`

The default value of the parameter.

**Example:** Setting the value of a parameter to its default value.

```tsx "voices.defaultValue"
import { usePluginContext } from "./bindings/PluginProvider";

function App() {
  const ctx = usePluginContext();
  const voices = ctx.parameters.voices;

  return (
    <button onClick={() => voices.setValue(voices.defaultValue)}>Reset</button>
  );
}

export default App;
```

### rawValue

`number`

The raw value of the parameter, directly taken from the plugin.

```tsx "voices.rawValue"
import { usePluginContext } from "./bindings/PluginProvider";

function App() {
  const ctx = usePluginContext();
  const voices = ctx.parameters.voices;

  return (
    <div>
      {voices.name}: {voices.rawValue}
    </div>
  );
}

export default App;
```

### setValue

`function(value: number): void`

Sets the value of the parameter.

**Example:** Setting the value of a parameter to its default value.

```tsx "voices.setValue"
import { usePluginContext } from "./bindings/PluginProvider";

function App() {
  const ctx = usePluginContext();
  const voices = ctx.parameters.voices;

  return (
    <button onClick={() => voices.setValue(voices.defaultValue)}>Reset</button>
  );
}

export default App;
```

### formatter

`Formatter<number>`

Internally used to format the value of the parameter.

### range

`Range`

The range of the parameter. Can be any `Range`, analogously to the nih_plug
ranges. A range has the following methods:

- `normalize(value: number): number` - Normalizes a value to the range [0, 1]
- `unnormalize(value: number): number` - Unnormalizes a value from the range [0, 1]
- `getMin: () => number` - Returns the minimum value of the range
- `getMax: () => number` - Returns the maximum value of the range
- `clamp(n: number): number` - Clamps a value to the range

**Example:** Creating a range input for a parameter.

```tsx "voices.range"
import { usePluginContext } from "./bindings/PluginProvider";

function App() {
  const ctx = usePluginContext();
  const voices = ctx.parameters.voices;

  return (
    <input
      type="range"
      className="slider"
      min={voices.range.getMin()}
      max={voices.range.getMax()}
      step={1}
      value={voices.rawValue}
      onChange={(e) => {
        voices.setValue(Number(e.target.value));
      }}
    />
  );
}

export default App;
```

### Optional fields

These fields are optional and may not be present in all parameters.

#### unit

`string`

The unit of the parameter.

```tsx "voices.unit"
import { usePluginContext } from "./bindings/PluginProvider";

function App() {
  const ctx = usePluginContext();
  const voices = ctx.parameters.voices;

  return (
    <div>
      {voices.name}: {voices.value} {voices.unit}
    </div>
  );
}

export default App;
```

## BoolParam

A parameter whose value is a boolean.

### id

`string`

The ID of the parameter.

```tsx "mute.id"
import { usePluginContext } from "./bindings/PluginProvider";

function App() {
  const ctx = usePluginContext();
  const mute = ctx.parameters.mute;

  return <div>{mute.id}</div>;
}

export default App;
```

### name

`string`

The name of the parameter.

```tsx "mute.name"
import { usePluginContext } from "./bindings/PluginProvider";

function App() {
  const ctx = usePluginContext();
  const mute = ctx.parameters.mute;

  return (
    <div>
      {mute.name}: {mute.value}
    </div>
  );
}

export default App;
```

### value

`string`

The current value of the parameter, formatted by the [value_to_string](/reference/parameters-rust/#value_to_string) function passed to the parameters, if present.

```tsx "mute.value"
import { usePluginContext } from "./bindings/PluginProvider";

function App() {
  const ctx = usePluginContext();
  const mute = ctx.parameters.mute;

  return (
    <div>
      {mute.name}: {mute.value}
    </div>
  );
}

export default App;
```

### defaultValue

`boolean`

The default value of the parameter.

**Example:** Setting the value of a parameter to its default value.

```tsx "mute.defaultValue"
import { usePluginContext } from "./bindings/PluginProvider";

function App() {
  const ctx = usePluginContext();
  const mute = ctx.parameters.mute;

  return (
    <button onClick={() => mute.setValue(mute.defaultValue)}>Reset</button>
  );
}

export default App;
```

### rawValue

`boolean`

The raw value of the parameter, directly taken from the plugin.

```tsx "mute.rawValue"
import { usePluginContext } from "./bindings/PluginProvider";

function App() {
  const ctx = usePluginContext();
  const mute = ctx.parameters.mute;

  return (
    <div>
      {mute.name}: {mute.rawValue ? "Muted" : "Not muted"}
    </div>
  );
}

export default App;
```

### setValue

`function(value: boolean): void`

Sets the value of the parameter.

**Example:** Setting the value of a parameter to its default value.

```tsx "mute.setValue"
import { usePluginContext } from "./bindings/PluginProvider";

function App() {
  const ctx = usePluginContext();
  const mute = ctx.parameters.mute;

  return (
    <button onClick={() => mute.setValue(mute.defaultValue)}>Reset</button>
  );
}

export default App;
```

### toggle

`function(): void`

Toggles the value of the parameter.

**Example:** Toggling the value of a parameter.

```tsx "mute.toggle"
import { usePluginContext } from "./bindings/PluginProvider";

function App() {
  const ctx = usePluginContext();
  const mute = ctx.parameters.mute;

  return <button onClick={() => mute.toggle()}>Toggle</button>;
}

export default App;
```

### formatter

`Formatter<boolean>`

Internally used to format the value of the parameter.

### Optional fields

These fields are optional and may not be present in all parameters.

#### unit

`string`

The unit of the parameter.

```tsx "mute.unit"
import { usePluginContext } from "./bindings/PluginProvider";

function App() {
  const ctx = usePluginContext();
  const mute = ctx.parameters.mute;

  return (
    <div>
      {mute.name}: {mute.value} {mute.unit}
    </div>
  );
}

export default App;
```
