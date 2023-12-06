import {render, screen} from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from '@testing-library/user-event';
import Square from "../index";

test('renders the props.value passed in'), async () => {
    render(<Square value={"X"} />);
    expect(await screen.findByRole('button')).toHaveTextContent('X');
};

test('calls the click handler when the button is clicked'), async () => {
    const onClickHandler = jest.fn();
    render(<Square onClick={onClickHandler}/>);
    await userEvent.click(screen.findByRole('button'));
    expect(onClickHandler).toHaveBeenCalled();
};