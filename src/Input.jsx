import React from 'react'
import {afflatus} from 'afflatus'
var isObject = require('lodash/lang/isObject')
var isArray = require('lodash/lang/isArray')
var Matter = require('react-matterkit')
var {Button, Slider, Dropdown, Checkbox, MultiTypeInput,
  Input: MatterInput} = Matter

@afflatus
export default class Input extends React.Component {
  render() {
    var inputProps = this.props.describe()
    var {value, type, onChange} = inputProps
    var input = null

    var handleChange = val => {
      if (typeof onChange === 'function') {
        onChange(val)
      }
    }

    var createInput = inputType => {
      input = <MatterInput
        {...inputProps}
        addonOnClick = {inputProps.addonOnClick}
        type = {inputType}
        onChange = {handleChange}/>
    }

    var createCheckbox = () => input = <Checkbox
      {...inputProps}
      onChange={handleChange}/>

    var createDropdown = () => input = <Dropdown
      {...inputProps}
      onChange={handleChange}
      options={inputProps.options.map(option => {
        if (typeof option === 'string') {
          option = {label: option, value: option}
        }
        return option
      })}/>

    if (type) {
      switch(type) {
      case 'multi':
        input = <MultiTypeInput
          {...inputProps}
          onChange = {handleChange}/>
        break
      case 'dropdown':
        createDropdown()
        break
      case 'checkbox':
        createCheckbox()
        break
      case 'slider':
        input = <Slider
          {...inputProps}
          onChange={handleChange}/>
        break
      case 'number':
        createInput('number')
        break
      case 'string':
        createInput('string')
        break
      case 'color':
        createInput('string')
        break
      default:
        console.warn(`Unknown type: "${type}"`)
      }
    }
    else {
      if (!isObject(value)) {
        if (isArray(inputProps.options)) {
          createDropdown()
        }
        else {
          switch (typeof value) {
            case 'function':
              input = <Button
                icon={icon}
                label={inputProps.label || value.name || 'Button'}
                onClick={value}/>
              break
            case 'number':
              createInput('number')
              break
            case 'string':
              createInput('string')
              break
            case 'boolean':
              createCheckbox()
              break

          }
        }
      }
    }

    return input ?
      <span style={{flex: 1, overflow: 'hidden'}}>{input}</span> :
      <span hidden={true}/>
  }
}
