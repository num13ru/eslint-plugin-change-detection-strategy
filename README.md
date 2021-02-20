# eslint-plugin-change-detection-strategy

This eslint plugin checks [Angular ChangeDetectionStrategy](https://angular.io/api/core/ChangeDetectionStrategy) is `OnPush`

```typescript
@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
```
