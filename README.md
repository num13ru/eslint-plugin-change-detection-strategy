# DEPRECATED

This project is no longer maintained. Please use [@angular-eslint/prefer-on-push-component-change-detection](https://github.com/angular-eslint/angular-eslint/blob/main/packages/eslint-plugin/docs/rules/prefer-on-push-component-change-detection.md) instead.

# eslint-plugin-change-detection-strategy

This eslint plugin checks [Angular ChangeDetectionStrategy](https://angular.io/api/core/ChangeDetectionStrategy) is `OnPush`

Example of incorrect code:

```typescript
@Component({
    changeDetection: ChangeDetectionStrategy.Default // <-- error  Component should have ChangeDetectionStrategy.OnPush  change-detection-strategy/on-push
}) { }

@Component({
    ... // <-- error  Component should have ChangeDetectionStrategy.OnPush  change-detection-strategy/on-push
}) { }
```


Example of correct code:

```typescript
@Component({
    changeDetection: ChangeDetectionStrategy.OnPush
}) { }
```


## Installation

`npm install --save-dev eslint-plugin-change-detection-strategy`

or

`yarn add -D eslint-plugin-change-detection-strategy`

## Usage

1. Add to .eslintrc plugins:
    ```
    "plugins": [ "change-detection-strategy" ],
    ```
1. Add to .eslintrc rules:
    ```
    "rules": { "change-detection-strategy/on-push": "error" }
    ```
1. Run `lint --fix` to fix the issues automatically.
1. Ignore the rule at some component if you like:
    ```
    // eslint-disable-next-line change-detection-strategy/on-push
    @Component({
        changeDetection: ChangeDetectionStrategy.OnPush // <-- ok
    }) { }
    ```
