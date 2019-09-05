import React from 'react'
import { ValidatorComponent } from 'react-form-validator-core'

export default class InputValidator extends ValidatorComponent {
  render() {
    const { errorMessages, validators, requiredError, validatorListener, ...rest } = this.props

    return (
      <div className='field'>
        {this.props.label ? (<label className='label'>{this.props.label}</label>) : null}
        <div className='control'>
          <input className='input' {...rest} ref={(r) => { this.input = r }} />
        </div>
        {this.errorText()}
      </div>
    )
  }

  errorText() {
    const { isValid } = this.state

    if (isValid) {
      return null;
    }

    return (
      <div>
        <span className='input-error'>
          {this.getErrorMessage()}
        </span>
      </div>
    )
  }
}
