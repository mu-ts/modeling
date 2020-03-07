
Decorators and helpers for models used by AWS services.

# Example

These attributes are all attribute descriptions for model classes, that provide additional information for an operation.

```
import { generated } from '@mu-ts/modeling';

class User {
  @generated('v4')
  id: string;
}

```

# aws-lambda 

By default this model is exported as a part of this project. So you can access all of the variables through this instance.

```
import { Context } from '@mu-ts/modeling';
```

## Validation

| Decorator | Description |
| --------- | ----------- |
| `@required()` | This value must be provided. Will be triggered when validation is defined for event consumption. |

## Serialization

| Decorator | Description |
| --------- | ----------- |
| `@generated(IDGenerator?)` | If, during serialization, this value is undefined or null it will be generated using the algorithm described or, by executing the funciton provided. The function will recieve the object as the first argument, and a uuid v4 as the second. |
| `@encode('hex' | 'base64'?)` | The value will be encoded at the time of serialization, with the algorithm defined. |
| `@encyrpt(Buffer)` | The value will be encrypted during serialization, using the secret key provided. |
| `@redact(RedactUnless?)` | Do not serialize this value. If a `RedactUnless` function is provided, it will be executed at the time of serialization, and not serialize if it returns true. |
| `@metadata(string?)` | This value should be persisted as metadata, using the name of the attribute as the key, or the first string if provided. |
| `@attribute(string?)` | Tells the serializer this value is an attribute, not a value and that when attribute are generated, to give it the name provided (first argument) if provided. |
| `@tag(string?)` | This attribute should be saved as a tag, using the name of the attribute as the key, or the first string if provided. |
