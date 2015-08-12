var React = require('react')
var clone = require('lodash/lang/clone')
var assign = require('lodash/object/assign')
var Matterkit = require('react-matterkit')
var {ItemGroup, Button} = Matterkit

export default class Buttons extends React.Component {
  handleButtonClick = (btn) => {
    btn.onClick(this.props.leaf.connect)
  }

  render() {
    var {buttons, buttonStyle} = this.props

    return <ItemGroup>
      {buttons.map((btn, idx) => {
        var visibility = 'visible'
        var button

        if (btn.hideWhenLeaved && !this.props.hover) {
          visibility = 'hidden'
        }

        if (btn.getElement) {
          button = btn.getElement()
        }
        else {
          button = <Button
            {...btn}
            onClick={() => this.handleButtonClick(btn)}/>
        }

        return <div key={idx} style={{...buttonStyle, visibility}}>
          {button}
        </div>
      })}
    </ItemGroup>
  }
}
