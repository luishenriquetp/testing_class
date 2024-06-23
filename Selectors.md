# React Testing Library


[React Testing Library Doc](https://testing-library.com/docs/react-testing-library/intro/)

## Selectors Table
![Selectors](./assets/selectors.png)x


## Matching Multiple Elements
All of these functions throw an error if more than one match is found… Unless you use the key word All in them. That means you can use getAllBy, queryAllBy and findAllBy.

By doing so, instead of getting one matching node, you get an array of them. You can use that array to check if you have the expected amount of a specific element and/or fire actions on some of them.

```js
const buttons = screen.getAllByText('Click me!');
expect(buttons.length).toBe(3);
userEvent.click(buttons[0]);

```