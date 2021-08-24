## File Component

```TypeScript
  import { Component } from '@angular/core';
  @Component({
    selector: 'hello-ng-world',
    template: `<h1>Hello Angular world</h1>`
  })
  export class HelloWorld {
  }
```

- `selector`: tên được đặt để gọi component
- `template`: Là tự định nghĩa khung html cho component dạng string ở trong file này luôn
- `templateUrl`: Là đường dẫn url tới file html bên ngoài để load file đó vào làm html cho component này
- `styles`: Là viết style css luôn vào file component này. Cách này chỉ dùng cho component đơn giản.
- `styleUrls`: Là đường dẫn url đến file style css độc lập cho component này

## Module

- Là một class có decorator là @NgModule({})
- Các thành phần:
  - `declaration`: nơi khai báo các component, directive, pipes,
  - `imports`: nơi khai báo các `module` của Angular hoặc các `module` do mình định nghĩa
  - `providers`: nơi khai báo `service`
  - `bootstrap`: nơi khai báo component chạy đầu tiên
- Có 2 loại module
  - Module chức năng:
    Tạo module: `ng g module my-module`
    Tiến hành import các component, service, pipe, router của riêng component
  - ShareModule (Module dùng chung):

## Data Binding

Binding từ file `.ts` sang `.html`

- Interpolation: `{{ }}`-> hiển thị các biến, toán tử 3 ngôi, phương thức, getter,...
- Property: `[property_name] = "value"`
  VD: property_name: src, value, href, disabled, hidden
- Attribute: `[attr.attribute_name] = "value"`
  VD: `[attr.width] = "variableWidth"`, trong đó variableWidth: number = 200;
- Class Binding: `[class.class_name] = "value"`
  Truyền nhiều class: `[class]="{'class1': expression1, 'class2': expression2,'class3': expression3}"`
- Style Binding: `[style.style_name] = "value"`

## Event Binding

Binding từ file `.html` sang `.ts`

```ts
<button type="button" (click)="handler()">Click</button>
(click)="functionName($event)"
(keyup)="functionName($event)" // thường sử dụng cho ô input
```

```ts
handler() { }

functionName(e) { }
```

## Two-way Binding

- Cần import FormsModule để sử dụng.

`[(ngModel)]`
Hoặc
`[ngModel] = "name" (ngModelChange) = "name = $event"`

## Truyền dữ liệu giữa các Component

`@Input`: Truyền data từ component cha -> component con.

- Cần import `Input`
- Cú pháp truyền `[key_tự_đặt]="tên_biến"`
  VD:

```TypeScript
<component-con [profile]="name"></component-con>
```

- Ở component con sẽ nhận lại data truyền vào: `@Input('profile')`
  Cách 2: sử dụng get/set

`@Output`: Truyền data từ component con -> component cha.

- Cần import `Output`, `EventEmitter`
- Ở component con:
  @Output("biến-này-sẽ-được-component-cha-nhận") biến-đẩy-data-ra-ngoài = new EventEmitter<kiểu_dữ_liệu>()
  trong hàm: `this.biến-đẩy-data-ra-ngoài.emit(this.biến-chứa-giá-trị-cần-đẩy)`

- Ở component cha có chứa thẻ component con:

```TypeScript
<component-con (biến-này-sẽ-được-component-cha-nhận)="function($event)"></component-con>

function(data) { // data là giá trị từ component con gửi ra }
```

## Sử dụng Pipe

Các Pipe có sẵn:

- `uppercase`
- `lowercase`
- `titlecase`: viết hoa các ký tự đầu (nếu là chữ Việt thì không được. VD: Đ)
- `slice`
- `decimal`: số | number: '1.0.3' // min.min-max
  - 1: số chữ số phần nguyên - nếu thiếu tự thêm số 0
  - 0: số chữ số thập phân tối thiểu - nếu thiếu tự thêm số 0
  - 3: số chữ số thập phân tối đa
- `percent`: %
- `currency` (xử lý tiền tệ): số | currency[:code]:đơn_vị_tiền_tệ[:1.0-3]]
  - code: theo chuẩn iso 4217
  - đơn vị tiền tệ: true or false. VD: VND -> đ, USD -> $
    VD: số | currency:'VND':true
- `date`:
  VD: date | date: 'dd/MM/y hh:mm:ss a' . tham khảo DatePipe trang angular.io
- `json`
- `async`

Custom Pipe

- Tạo một Pipe bằng Angular: `ng g pipe my-pipe`
  VD: Trong class đã tạo Pipe

```TypeScript
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatData',
})
export class FormatDataPipe implements PipeTransform {
  // value: là giá trị cần format
  // args: là chỉ số của thằng pipe. VD: formatData: 10
  transform(value: any, ...args: any[]): any {
    return value.substr(0, args) + '...';
  }
}
```

HTML sử dụng

```HTML
{{ test | transform: 20 }} // test (string): là biến khai báo ở .ts gọi ra
```

## Template reference variables (tham chiếu tới phần từ DOM)

- Đặt tên cho 1 thẻ HTML: `#tên_biến` hoặc `ref-tên_biến`

  - Sử dụng luôn bên Template: `tên_biến.value`
    VD: Trong .html
    ```html
    <input type="text" #txtName />
    <button type="button" (click)="onGetData(txtName.value)">
      Lấy dữ liệu
    </button>
    ```
    Trong .ts
    ```TypeScript
    onGetData(txtName): void { console.log(txtName); }
    ```
  - Sử dụng `@ViewChild`
    VD: Trong .html

    ```html
    <!-- txtName ở đây đc xem là HTMLElement -->
    <input type="text" #txtName />
    <button type="button" (click)="onGetDataView()">Lấy dữ liệu</button>

    <!-- ##################### -->

    <!-- 
      toggleComp ở đây đc xem như là một instance của một component 
      toggleComp sẽ truy cập được vào các hàm trong component-toggle
    -->
    <component-toggle #toggleComp></component-toggle>
    ```

    Trong .ts

    ```TypeScript
    // vì #toggleComp nằm trong 1 thẻ component nên mới có kiểu ComponentToggle đó
    @ViewChild('toggleComp') toggleComp: ComponentToggle;

    // #################################

    @ViewChild('txtName') name: ElementRef; // name: là biến để lưu giá trị txtName
    // ElementRef là khi biến #txtName nằm trong 1 HTMLElement
    // ViewChild sẽ tham chiếu tới ô input có #txtName

    onGetDataView(txtName): void {
      console.log(this.name.nativeElement.value);
    }

    // Đọc thêm:
    // static để gọi được trong ngOnInit
    // Nếu sử dụng static thì component khai báo txtName phải không nằm trong Directive nào mới chạy được
    @ViewChild('txtName', { static: true }) name: ElementRef;
    ```

## ngContent

- Cú pháp: `<ng-content></ng-content>`
- Dùng để hiển thị các prop, html bên trong selector của một component
  VD: `<my-component> Nội dung bên trong </my-component>` -> Toàn bộ nội dung bên trong sẽ được đưa vào ngContent
- Dùng `<ng-content select=".class"></ng-content>` // Dùng để lấy riêng một thẻ nào đó

## Lifecycle Hook

- Mỗi hook sẽ thuộc về 1 interface

- `Constructor`: sẽ được gọi trước tất cả Lifecycle Hook, thường dùng để tiêm các Dependency Injection như `Service`

- `ngOnchanges`: được thực khi `INPUT` có sự thay đổi. Được quản lý thông qua đối tượng `SimpleChanges`,
  được gọi trước `ngOnInit`
  SimpleChanges (tham số trong hàm ngOnchanges): Dùng để xử lý khi `@Input` có sự thay đổi + `currentValue`: giá trị hiện tại + `previousValue`: giá trị trước đó + `isFirstChange()`: thay đổi lần đầu tiên ? true : false

- `ngOnInit`: dùng để khởi tạo giá trị - import OnInit, implement OnInit

  - Khởi tạo directive/component sau khi hiển thị lần đầu tiên và set các thuộc tính đầu vào của directive/component
  - Chỉ gọi một lần duy nhất, sau khi `ngOnchanges()` được gọi lần đầu tiên

- `ngDoCheck`: được gọi sau `ngOnchanges()` và `ngOnInit()`. Sau mỗi lần ngOnchanges được gọi thì `ngDoCheck()` sẽ được gọi
  . `ngAfterContentInit`: được gọi 1 lần duy nhất
  . `ngAfterContentChecked`
  . `ngAfterViewInit`: được gọi khi khởi tạo view của component và các child views. Được gọi một lần duy nhất

  - Chính là phần view hiện tại
  - Xử lý `Template` + `Template Reference Variables`
  - Sử dụng `ViewChild`
    . `ngAfterViewChecked`: Được gọi nhiều lần. Gọi khi trên view có sự thay đổi. Chỉ dành cho component

- `ngOnDestroy`: hủy các kết nối, giải phóng bộ nhớ. Được gọi khi chuyển đổi, hủy, kết thúc 1 component

## Service

- Tạo một service: `ng g service name_service --spec false`

## Router

- Được đổ vào `Router-outlet`: vùng sẽ thay đổi data
- `routerLinkActive="active"`: khi cái routerLink này khớp với cái path thì nó sẽ có cái class là active
- `Router-link`:
  Cú pháp: `[routerLink]="['/tên_router', params]"`
  VD: `[routerLink]="['/products', item.id]"`
- Chuyển trang bằng event binding:

  - .html

  ```html
  (click)="navigate('index')"
  ```

  - .ts

  ```TypeScript
  import { Router } from "@angular/router"

  constructor(public router: Router)
  navigate(url: string) {
    this.router.navigate([url]);
  }
  ```

```Javascript
const routes: Routes = [
  {
    path: "",
    redirecTo: "/index", // hiểu là khi vài 1 cái router rỗng thì sẽ tự động chuyển trang sang index
    pathMatch: "full"
  },
  {
    path: "",
    component: Tên_component_tương_ứng
  },
  {
    path: "",
    component: Tên_component_tương_ứng
  },
  {
    path: "**", // khi không tìm thấy component
    component: NotFound
  },
];
```

## Lấy tham số trên Router

Lấy tham số trên Router - URL (ActivatedRoute - snapshot)
Cách 1:

```Javascript
 const routes: Routes = [
        {
          path: "/products/:id",
          component: ProductDetail
        },
      ];
```

Vào component ProductDetail để nhận lại tham số

```TypeScript
import { ActivatedRoute } from "@angular/router"

constructor(public activatedRoute: ActivatedRoute){}

ngOnInit() {
  let id = (+this.activatedRoute.snapshot.params['id']);
}
```

Cách 2: Lấy tham số bằng `params`

```Javascript
const routes: Routes = [
        {
          path: "/products/:id",
          component: ProductDetail
        },
      ];
```

Vào component ProductDetail

```TypeScript
ngOnInit() {
  this.handleParams();
}

handleParams() {
  this.subsciption = this.activatedRoute.params.subscribe(data => {
    let id = data.id; // lấy được id từ url bằng params
    // gọi hàm xử lý từ service
    .....
  })
}
// Do subsciption luôn luôn lúc nào cũng lắng nghe nên cần phải hủy nó khi kết thúc
ngOnDestroy() {
  this.subsciption.unsubscribe();
}
```

## Cách lấy tham số QueryParams: có dạng `?`

Truyền lên đường dẫn
Bắt buộc cần có: `routerLink`

- Cách 1: Truyền bên template
  Cú pháp: `[queryParams] = "{ key1: value, key2: value }"`
  VD: .html
  `html <button [routerLink] = "['/products']" // truyền tới cái trang cần lấy params [queryParams] = "{ name: name ? name : '', price: price ? price : '' }" > </button> `
- Cách 2: truyền bên component
  VD: .html
  `html <button (click)="onSearch()" > </button> `
  .ts

  ````TypeScript
  import { Router, ActivatedRoute } from "@angular/router"

      public products: Product[] = [];
      public name: string;
      public price: number;
      public subsciption: Subsciption;

      constructor(
        public router: Router,
        public activatedRoute: ActivatedRoute

      ){ }

      onSearch() {
        this.router.navigate(['/products'], { queryParams: { name: this.name, price: this.price }});
      }

      //Nhận lại params
      ngOnInit() {
        this.subsciption = this.activatedRoute.queryParams.subsciption(data => {
          let name = data.name // data['name']
          let price = data.price // data['price']

          //Gọi hàm xử lý ....
        })
      }

      ngOnDestroy() {
        this.subsciption.unsubscribe();
      }
      ```
  ````

## Child Router

```TypeScript
const routes: Routes = [
  {
    path: "/products",
    component: ProductComponent // cần khai báo router-outlet tại component cha
    children: [
      {
        path:'list',
        component: ProductListComponent
      },
      {
        path:':id',
        component: ProductDetail
      },
    ]
  },
];
```

## Template Driven Form

- import `ngForm`
- Cần đặt tên cho form: `#ten_form="ngForm"`
- `[(ngModel)]` cho các ô input
- Đặt `name` cho các ô input
- Để submit form: `(ngSubmit)=""` // button phải có type="submit"
  VD: Test thử `(ngSubmit)="onSubmit(ten_form)"`
  .ts
  `TypeScript onSubmit(value: NgForm) { log(value.value); } `

## Reactive Form

- import `ReactiveFormModule` trong file `app.module`
- import `FormGroup`, `FormBuilder`
  Inject `FormBuilder` vào `constructor`
  Khởi tạo public `formGroup: FormGroup`
  VD: Trong .ts

  ```Typescript
  public frmUser: FormGroup;

  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.frmUser = this._formBuilder.group({
      username:['', [Validator.required, ...]], // giá trị đầu tiên là giá trị mặc định, thứ 2 là validate của trường này
      password:['', []]
    });
  }

  onSubmitForm() {

  }
  ```

  Trong .html

  ```html
  <form [formGroup]="frmUser" (ngSubmit)="onSubmitForm()">
    <input formControlName="username" />
    <span
      *ngIf="frmUser.controls.username.dirty && frmUser.controls.username.errors?.required"
    >
      Validate tại đây
    </span>
    <input formControlName="password" />
  </form>
  ```
