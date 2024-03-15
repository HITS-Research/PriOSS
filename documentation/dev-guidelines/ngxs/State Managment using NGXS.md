# NGXS State Management Guidelines

## Introduction

These guidelines provide a set of best practices and conventions for managing state in an Angular application using NGXS. NGXS is a state management library that leverages the power of Angular and RxJS for efficient state management.

## Table of Contents

1. [Setup](#setup)
2. [State Structure](#state-structure)
3. [Actions](#actions)
4. [Selectors](#selectors)
5. [Effects](#effects)
6. [State Hydration](#state-hydration)
7. [Testing](#testing)
8. [Documentation](#documentation)

## 1. Setup

### 1.1 Installation

Install NGXS and the NGXS DevTools package:

```bash
npm install @ngxs/store @ngxs/devtools-plugin
```

### 1.2 Configuration

Configure NGXS in your Angular application by adding the `NgxsModule` to your `AppModule`:

```typescript
import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';

@NgModule({
  imports: [
    NgxsModule.forRoot([/* Your States Here */]),
    NgxsReduxDevtoolsPluginModule.forRoot()
  ],
  // ...
})
export class AppModule {}
```

## 2. State Structure

### 2.1 Single Responsibility

Define states with a single responsibility. Keep them focused on managing a specific part of the application state.

```typescript
export interface AppState {
  user: UserData;
  products: ProductsSpecification;
}

export interface UserData {
  // ...
}

export interface ProductsSpecification {
  // ...
}
```

### 2.2 Immutable State

Ensure that the state is immutable to avoid unintended side effects. Use the spread operator or immer.js for state updates.

```typescript
@Action(UpdateUser)
updateUser({ getState, setState }: StateContext<UserState>, { payload }: UpdateUser) {
  const state = getState();
  setState({ ...state, ...payload });
}
```

## 3. Actions

### 3.1 Naming Conventions

Use clear and descriptive action names in the form of `[Feature] ActionName`.

```typescript
export class ResetUser {
  static readonly type = '[User] Reset';
}
```

### 3.2 Payload Usage

When an action requires additional data, provide a payload property.

```typescript
export class UpdateUser {
  static readonly type = '[User] Update';
  constructor(public payload: UserData) {}
}
```

## 4. Selectors

### 4.1 Memoized Selectors

Use memoized selectors for efficient state access and to prevent unnecessary recalculations.

```typescript
@Selector([UserState])
static getUser(state: UserState): User {
  return state.user;
}
```

### 4.2 `selectSnapshot`

#### 4.2.1 Basic Usage

`selectSnapshot` allows you to get the current state snapshot directly without subscribing to changes. It's useful for synchronous operations or when you need to get the state at a specific point in time.

```typescript
import { SelectSnapshot } from '@ngxs/store';

// Inside a service or component
@SelectSnapshot(UserState)
currentUser: User;
```

```typescript
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { AppState } from 'path-to-your-states'; // Update the path accordingly
import { getuserData } from 'path-to-your-selectors'; // Update the path accordingly

@Component({
  selector: 'app-other',
  template: `
    <div>
      <h2>User Details in Other Component</h2>
      <p>{{ userData | json }}</p>
    </div>
  `,
})
export class OtherComponent implements OnInit {
  userData: User; // Assuming User is the type of your user data

  constructor(private store: Store) {}

  ngOnInit() {
    // Access the current user using selectSnapshot
    this.userData = this.store.selectSnapshot(getuserData);
    console.log('Current User in OtherComponent:', this.userData);
  }
}
```

#### 4.2.2 Combining Selectors

Combine multiple selectors using `selectSnapshot` to derive a new piece of state.

```typescript
@SelectSnapshot(AppState.getUser)
@SelectSnapshot(AppState.getPermissions)
combinedData(state: User, permissions: Permission[]): CombinedData {
  // Combine user and permissions data
  // ...
}
```

### 4.3 Subscribing to `select` Observable in Components

#### 4.3.1 Component Subscription

In Angular components, you can subscribe to the `select` observable to reactively update the component when the state changes.

```typescript
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';

// Inside a component
@Select(AppState.getUser)
user$: Observable<User>;

ngOnInit() {
  this.user$.subscribe((user: User) => {
    // Handle user state changes
  });
}
```

#### 4.3.2 Async Pipe

Use the `async` pipe to subscribe to `select` observables directly in the template, simplifying the component code.

```html
<!-- Inside the component template -->
<div *ngIf="user$ | async as user">
  <!-- Display user information -->
</div>
```

#### 4.3.3 Multiple Selectors

Subscribe to multiple selectors using the `select` decorator.

```typescript
@Select(AppState.getUser)
user$: Observable<User>;

@Select(AppState.getProducts)
products$: Observable<Product[]>;

ngOnInit() {
  this.user$.subscribe((user: User) => {
    // Handle user state changes
  });

  this.products$.subscribe((products: Product[]) => {
    // Handle products state changes
  });
}
```

## 5. Effects

### 5.1 Async Operations

Use effects for handling asynchronous operations such as API calls. Keep business logic separate from the components.

```typescript
@Action(LoadProducts)
loadProducts({ getState, setState }: StateContext<ProductsState>) {
  return this.productService.getProducts().pipe(
    tap((products: Product[]) => {
      setState({ ...getState(), products });
    })
  );
}
```

## 6. State Hydration

### 6.1 Hydration from Backend

When the application loads, hydrate the state from the backend to initialize the store with the server-side state.

```typescript
ngOnInit() {
  this.store.dispatch(new LoadInitialData());
}
```

## 7. Testing

### 7.1 Unit Testing

Write unit tests for actions, selectors, and state logic to ensure the correctness of the state management.

## 8. Documentation

### 8.1 Readme

Maintain this up-to-date README file. It provides an overview of the state structure, actions, selectors, and any additional information related to state management.

---
