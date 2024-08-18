---
title: Parameters (Rust)
description: Parameters inside your Rust code and the rp_params macro.
---

In React-Plug, parameters are defined in Rust, and they are automatically available in your React GUI. This is done using the `rp_params` macro.

```rust
use react_plug::prelude::*;

rp_params! {
    MyParameters {
        // Define your parameters here
    }
}
```

React-Plug supports the following parameter types:

## FloatParam

A floating-point parameter. Requires a `name`, `value`, and `range`.

```rust {3-10}
rp_params! {
    MyParameters {
        gain: FloatParam {
            name: "Gain",
            value: 1.0,
            range: FloatRange::Linear {
                min: 0.0,
                max: 1.0,
            },
        }
    }
}
```

### name

`impl Into<String>`

The name of the parameter. This is the name that will be displayed in the GUI.

```rust {4}
rp_params! {
    MyParameters {
        gain: FloatParam {
            name: "Gain",
            value: 1.0,
            range: FloatRange::Linear {
                min: 0.0,
                max: 1.0,
            },
        }
    }
}
```

### value

`f32`

The initial value of the parameter.

```rust {5}
rp_params! {
    MyParameters {
        gain: FloatParam {
            name: "Gain",
            value: 1.0,
            range: FloatRange::Linear {
                min: 0.0,
                max: 1.0,
            },
        }
    }
}
```

You can also use the `util::db_to_gain` function to convert a decibel value to a gain value.

```rust {5}
rp_params! {
    MyParameters {
        gain: FloatParam {
            name: "Gain",
            value: util::db_to_gain(0.0),
            range: FloatRange::Skewed {
                min: util::db_to_gain(-30.0),
                max: util::db_to_gain(30.0),
                factor: FloatRange::gain_skew_factor(-30.0, 30.0),
            },
        }
    }
}
```

### range

[`FloatRange`](https://nih-plug.robbertvanderhelm.nl/nih_plug/params/range/enum.FloatRange.html)

The range of the parameter.

Here's a linear range:

```rust {5}
rp_params! {
    MyParameters {
        gain: FloatParam {
            name: "Gain",
            value: 1.0,
            range: FloatRange::Linear {
                min: 0.0,
                max: 1.0,
            },
        }
    }
}
```

And here's a skewed range:

```rust {5}
rp_params! {
    MyParameters {
        gain: FloatParam {
            name: "Gain",
            value: util::db_to_gain(0.0),
            range: FloatRange::Skewed {
                min: util::db_to_gain(-48.0),
                max: util::db_to_gain(6.0),
                factor: FloatRange::gain_skew_factor(-48.0, 6.0),
            },
        }
    }
}
```

### Optional properties

The optional properties of a `FloatParam` are basically all the optional modifiers of `nih_plug`'s [FloatParam](https://nih-plug.robbertvanderhelm.nl/nih_plug/params/struct.FloatParam.html#implementations) - in React-Plug, something like `with_unit(" dB")` just becomes `unit: " dB"`.

#### poly_moulation_id

`u32`

This ID is used to uniquely identify this parameter in `nih_plug`'s [`NoteEvent::PolyModulation`](https://nih-plug.robbertvanderhelm.nl/nih_plug/midi/enum.NoteEvent.html#variant.PolyModulation) events, and must thus be unique between all polyphonically modulatable parameters.

#### smoother

[`SmoothingStyle`](https://nih-plug.robbertvanderhelm.nl/nih_plug/params/smoothing/enum.SmoothingStyle.html)

Sets up a smoother that can gradually interpolate changes made to this parameter, preventing clicks and zipper noises.

```rust {11}
rp_params! {
    MyParameters {
        gain: FloatParam {
            name: "Gain",
            value: util::db_to_gain(0.0),
            range: FloatRange::Skewed {
                min: util::db_to_gain(-48.0),
                max: util::db_to_gain(6.0),
                factor: FloatRange::gain_skew_factor(-48.0, 6.0),
            },
            smoother: SmoothingStyle::Logarithmic(50.0)
        }
    }
}
```

#### unit

`&'static str`

The unit of the parameter. This is the unit that will be displayed in the GUI.

```rust {11}
rp_params! {
    MyParameters {
        gain: FloatParam {
            name: "Gain",
            value: util::db_to_gain(0.0),
            range: FloatRange::Skewed {
                min: util::db_to_gain(-48.0),
                max: util::db_to_gain(6.0),
                factor: FloatRange::gain_skew_factor(-48.0, 6.0),
            },
            unit: " dB"
        }
    }
}
```

#### step_size

`f32`

The step size of the parameter.

```rust {10}
rp_params! {
    MyParameters {
        gain: FloatParam {
            name: "Gain",
            value: 0.0,
            range: FloatRange::Linear {
                min: 0.0,
                max: 1.0,
            },
            step_size: 0.1
        }
    }
}
```

#### value_to_string

`Arc<dyn Fn(f32) -> String + Send + Sync>`

The formatting function for the parameter value. This function is used to format the parameter value as a string for display in VST hosts and the GUI.

```rust {11}
rp_params! {
    MyParameters {
        gain: FloatParam {
            name: "Gain",
            value: util::db_to_gain(0.0),
            range: FloatRange::Skewed {
                min: util::db_to_gain(-48.0),
                max: util::db_to_gain(6.0),
                factor: FloatRange::gain_skew_factor(-48.0, 6.0),
            },
            value_to_string: formatters::v2s_f32_gain_to_db(2),
            string_to_value: formatters::s2v_f32_gain_to_db(),
        }
    }
}
```

#### string_to_value

`Arc<dyn Fn(&str) -> Option<f32> + Send + Sync>`

The inverse of `value_to_string`.

```rust {12}
rp_params! {
    MyParameters {
        gain: FloatParam {
            name: "Gain",
            value: util::db_to_gain(0.0),
            range: FloatRange::Skewed {
                min: util::db_to_gain(-48.0),
                max: util::db_to_gain(6.0),
                factor: FloatRange::gain_skew_factor(-48.0, 6.0),
            },
            value_to_string: formatters::v2s_f32_gain_to_db(2),
            string_to_value: formatters::s2v_f32_gain_to_db(),
        }
    }
}
```

## IntParam

A discrete integer parameter that’s stored unnormalized. Requires a `name`, `value`, and `range`.

```rust {3-10}
rp_params! {
    MyParameters {
        voices: IntParam {
            name: "Voices",
            value: 4,
            range: IntRange::Linear {
                min: 1,
                max: 16,
            },
        }
    }
}
```

### name

`impl Into<String>`

The name of the parameter. This is the name that will be displayed in the GUI.

```rust {4}
rp_params! {
    MyParameters {
        voices: IntParam {
            name: "Voices",
            value: 4,
            range: IntRange::Linear {
                min: 1,
                max: 16,
            },
        }
    }
}
```

### value

`i32`

The initial value of the parameter.

```rust {5}
rp_params! {
    MyParameters {
        voices: IntParam {
            name: "Voices",
            value: 4,
            range: IntRange::Linear {
                min: 1,
                max: 16,
            },
        }
    }
}
```

### range

[`IntRange`](https://nih-plug.robbertvanderhelm.nl/nih_plug/params/range/enum.FloatRange.html)

The range of the parameter.

```rust {6-9}
rp_params! {
    MyParameters {
        voices: IntParam {
            name: "Voices",
            value: 4,
            range: IntRange::Linear {
                min: 1,
                max: 16,
            },
        }
    }
}
```

### Optional properties

The optional properties of a `IntParam` are basically all the optional modifiers of `nih_plug`'s [IntParam](https://nih-plug.robbertvanderhelm.nl/nih_plug/params/struct.IntParam.html) - in React-Plug, something like `with_unit(" dB")` just becomes `unit: " dB"`.

#### poly_moulation_id

`u32`

This ID is used to uniquely identify this parameter in `nih_plug`'s [`NoteEvent::PolyModulation`](https://nih-plug.robbertvanderhelm.nl/nih_plug/midi/enum.NoteEvent.html#variant.PolyModulation) events, and must thus be unique between all polyphonically modulatable parameters.

#### smoother

[`SmoothingStyle`](https://nih-plug.robbertvanderhelm.nl/nih_plug/params/smoothing/enum.SmoothingStyle.html)

Sets up a smoother that can gradually interpolate changes made to this parameter, preventing clicks and zipper noises.

```rust {10}
rp_params! {
    MyParameters {
        voices: IntParam {
            name: "Voices",
            value: 4,
            range: IntRange::Linear {
                min: 1,
                max: 16,
            },
            smoother: SmoothingStyle::Logarithmic(50.0)
        }
    }
}
```

#### unit

`&'static str`

The unit of the parameter. This is the unit that will be displayed in the GUI.

```rust {10}
rp_params! {
    MyParameters {
        voices: IntParam {
            name: "Voices",
            value: 4,
            range: IntRange::Linear {
                min: 1,
                max: 16,
            },
            unit: " voices"
        }
    }
}
```

#### value_to_string

`Arc<dyn Fn(i32) -> String + Send + Sync>`

The formatting function for the parameter value. This function is used to format the parameter value as a string for display in VST hosts and the GUI.

```rust {10}
rp_params! {
    MyParameters {
        note: IntParam {
            name: "Note",
            value: 0,
            range: IntRange::Linear {
                min: 0,
                max: 127,
            },
            value_to_string: formatters::v2s_i32_note_formatter(),
            string_to_value: formatters::s2v_i32_note_formatter(),
        }
    }
}
```

#### string_to_value

`Arc<dyn Fn(&str) -> Option<i32> + Send + Sync>`

The inverse of `value_to_string`.

```rust {11}
rp_params! {
    MyParameters {
        note: IntParam {
            name: "Note",
            value: 0,
            range: IntRange::Linear {
                min: 0,
                max: 127,
            },
            value_to_string: formatters::v2s_i32_note_formatter(),
            string_to_value: formatters::s2v_i32_note_formatter(),
        }
    }
}
```

## BoolParam

A simple boolean parameter. Requires a `name` and a `value`.

```rust {3-6}
rp_params! {
    MyParameters {
        bypass: BoolParam {
            name: "Bypass",
            value: false
        }
    }
}
```

### name

`impl Into<String>`

The name of the parameter. This is the name that will be displayed in the GUI.

```rust {4}
rp_params! {
    MyParameters {
        bypass: BoolParam {
            name: "Bypass",
            value: false
        }
    }
}
```

### value

`bool`

The initial value of the parameter.

```rust {5}
rp_params! {
    MyParameters {
        bypass: BoolParam {
            name: "Bypass",
            value: false
        }
    }
}
```

### Optional properties

The optional properties of a `IntParam` are basically all the optional modifiers of `nih_plug`'s [IntParam](https://nih-plug.robbertvanderhelm.nl/nih_plug/params/struct.IntParam.html) - in React-Plug, something like `with_unit(" dB")` just becomes `unit: " dB"`.

#### poly_moulation_id

`u32`

This ID is used to uniquely identify this parameter in `nih_plug`'s [`NoteEvent::PolyModulation`](https://nih-plug.robbertvanderhelm.nl/nih_plug/midi/enum.NoteEvent.html#variant.PolyModulation) events, and must thus be unique between all polyphonically modulatable parameters.

#### value_to_string

`Arc<dyn Fn(i32) -> String + Send + Sync>`

The formatting function for the parameter value. This function is used to format the parameter value as a string for display in VST hosts and the GUI.

```rust {6}
rp_params! {
    MyParameters {
        bypass: BoolParam {
            name: "Bypass",
            value: false
            value_to_string: formatters::v2s_bool_bypass(),
            string_to_value: formatters::s2v_bool_bypass(),
        }
    }
}
```

#### string_to_value

`Arc<dyn Fn(&str) -> Option<i32> + Send + Sync>`

The inverse of `value_to_string`.

```rust {7}
rp_params! {
    MyParameters {
        bypass: BoolParam {
            name: "Bypass",
            value: false
            value_to_string: formatters::v2s_bool_bypass(),
            string_to_value: formatters::s2v_bool_bypass(),
        }
    }
}
```

## EnumParam

An enum parameter. Requires a `name`, a `value`, and `variants`.

```rust {3-11}
rp_params! {
    ExampleParams {
        waveform: EnumParam {
            name: "Waveform",
            value: Sine,
            variants: {
                Sine: "Sine Wave",
                Square: "Square Wave",
                WhiteNoise: "White Noise",
            },
        },
    }
}
```

### name

`impl Into<String>`

The name of the parameter. This is the name that will be displayed in the GUI.

```rust {4}
rp_params! {
    ExampleParams {
        waveform: EnumParam {
            name: "Waveform",
            value: Sine,
            variants: {
                Sine: "Sine Wave",
                Square: "Square Wave",
                WhiteNoise: "White Noise",
            },
        },
    }
}
```

### value

The initial value of the parameter.

```rust {5}
rp_params! {
    ExampleParams {
        waveform: EnumParam {
            name: "Waveform",
            value: Sine,
            variants: {
                Sine: "Sine Wave",
                Square: "Square Wave",
                WhiteNoise: "White Noise",
            },
        },
    }
}
```

### variants

All possible values the enum parameter may assume. Defined with the variant's **identifier** as the **key** and its **name** as the **value**.

```rust {6-10}
rp_params! {
    ExampleParams {
        waveform: EnumParam {
            name: "Waveform",
            value: Sine,
            variants: {
                Sine: "Sine Wave",
                Square: "Square Wave",
                WhiteNoise: "White Noise",
            },
        },
    }
}
```

### Optional properties

The optional properties of a `EnumParam` are basically all the optional modifiers of `nih_plug`'s [EnumParam](https://nih-plug.robbertvanderhelm.nl/nih_plug/params/enums/struct.EnumParam.html).

#### poly_moulation_id

`u32`

This ID is used to uniquely identify this parameter in `nih_plug`'s [`NoteEvent::PolyModulation`](https://nih-plug.robbertvanderhelm.nl/nih_plug/midi/enum.NoteEvent.html#variant.PolyModulation) events, and must thus be unique between all polyphonically modulatable parameters.
