import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../../redux/store/store';
import React from 'react';
import {PersonalCabinet} from "./PersonalCabinet";

describe('Registration function', () => {

  it("Input Registration Check", () => {
      render(
            <Provider store={store}>
                <PersonalCabinet />
            </Provider>
      );
      const nameInput = screen.getByPlaceholderText('Name');
      const passwordInput = screen.getByPlaceholderText('Password');

      fireEvent.change(nameInput, { target: { value: 'John' } });
      fireEvent.change(passwordInput, { target: { value: 'John@1234' } });

      expect(nameInput.value).toBe('John');
      expect(passwordInput.value).toBe('John@1234');

  });
});
