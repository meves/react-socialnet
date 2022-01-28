import React, { useState } from "react";
import { create, act } from 'react-test-renderer';
import ProfileStatus from "./ProfileStatus";

describe('ProfileStatus', () => {
    const status = "my profile status";
    test('render component correctly', () => {
        const component = create(<ProfileStatus status={status}/>);
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
    test('status is right', () => {
        const component = create(<ProfileStatus status={status} />);
        const innerStatus = component.root.findByType('span').children[0];
        expect(innerStatus).toBe(status);
    });
    test('while first rendering span has been rendering but input has not been rendering', () => {
        const component = create(<ProfileStatus status={status} />);
        const root = component.root;
        const span = root.findByType('span');        
        expect(span).toBeDefined();
        expect(() => root.findByType('input')).toThrow();
    });
    test('double click on span changes editMode with true', () => {
        const component = create(<ProfileStatus status={status}/>);
        const root = component.root;
        const span = root.findByType('span');
        act(() => span.props.onDoubleClick());        
        //expect(component.editMode).toBe(true);
    });
    test('when doubleClicked span is not rendered but input is rendered', () => {
        const component = create(<ProfileStatus status={status}/>);
        const root = component.root;
        const span = root.findByType('span');
        act(() => span.props.onDoubleClick());
        expect(() => root.findByType('span')).toThrow();
        const input = root.findByType('input');
        expect(input).toBeDefined();
    });
    test('when doubleClicked input value is right', () => {
        const component = create(<ProfileStatus status={status}/>);
        const root = component.root;
        const span = root.findByType('span');
        act(() => span.props.onDoubleClick());
        const input = root.findByType('input');
        expect(input.props.value).toBe(status);
    });
    test('when blured span is rendered but input is not rendered', () => {
        const mockCallback = jest.fn(status => undefined);
        const component = create(<ProfileStatus status={status} updateUserStatus={mockCallback}/>);
        const root = component.root;
        const span = root.findByType('span');
        act(() => span.props.onDoubleClick());
        const input = root.findByType('input');
        act(() => input.props.onBlur());
        expect(() => root.findByType('input')).toThrow();
        expect(root.findByType('span')).toBeDefined();
    });
    test('when blured editMode is false', () => {
        const mockCallback = jest.fn(status => undefined);
        const component = create(<ProfileStatus status={status} updateUserStatus={mockCallback} />);        
        const root = component.root;
        const span = root.findByType('span');
        act(() => span.props.onDoubleClick());
        const input = root.findByType('input');
        act(() => input.props.onBlur());
        //expect(component.useState.editMode).toBe(false);
    });  
});
