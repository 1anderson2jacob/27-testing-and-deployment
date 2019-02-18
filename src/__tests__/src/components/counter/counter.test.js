import React from 'react';
import renderer from 'react-test-renderer';
import Counter from '../../../../components/counter/counter.js';

describe("<Counter />", () => {
  it('is alive', () => {
    let component = shallow(<Counter />);
    expect(component.find('span').exists()).toBeTruthy();
  });

  it('changes state on count down click', () => {
    let component = mount(<Counter />);
    let button = component.find('.downClicker');
    button.simulate('click');
    expect(component.state('count')).toEqual(-1);
  });

  it('changes state on count up click', () => {
    let component = mount(<Counter />);
    let button = component.find('.upClicker');
    button.simulate('click');
    expect(component.state('count')).toEqual(1);
  });

  it('show changes visually, including polarity and count values', () => {
    let app = mount(<Counter />);
    expect(app.find('.count.negative').exists()).toBeFalsy();
    expect(app.find('.count.positive').exists()).toBeFalsy();

    app.find('.upClicker').simulate('click');
    expect(app.find('.count.positive').exists()).toBeTruthy();
    expect(app.find('.count').text()).toBe('1');

    app.find('.downClicker').simulate('click');
    expect(app.find('.count').text()).toBe('0');
    expect(app.find('.count.negative').exists()).toBeFalsy();
    expect(app.find('.count.positive').exists()).toBeFalsy();

    app.find('.downClicker').simulate('click');
    expect(app.find('.count.negative').exists()).toBeTruthy();
    expect(app.find('.count').text()).toBe('-1');
  });
});

describe('Counter component snapshot test', () => {
  it('renders correctly', () => {
    const component = renderer.create(<Counter />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});