import React, { Component } from 'react'
import scriptLoader from 'react-async-script-loader'
import { compose, pure } from 'recompose'

import keepCities from '@/lib/ui/helpers/keepCities'
import { LocationFormBreakpoints as breakpoints } from '@/lib/constants/breakpoints'
import { required } from '@/lib/ui/helpers/form/validators'

import GeosuggestField from '@/lib/ui/components/geosuggestField'
import Icon from '@/lib/ui/components/icon'
import {
  Button,
  Col,
  Form as UIForm,
  Grid,
  Loader,
  Modal,
  Row
} from '@/lib/ui/components/layout'

class SetLocationForm extends Component {
  constructor(props) {
    super(props)
    const { center } = props
    this.state = {
      center,
      isLoading: true
    }
  }

  componentDidMount() {
    const { isLoading, isScriptLoaded, isScriptLoadSucceed } = this.props

    if (!isLoading) {
      // parent data container finished loading
      if (isScriptLoaded) {
        if (isScriptLoadSucceed) {
          this.setIsLoading(false)
        } else {
          this.setIsLoading(null)
        }
      }
    }
  }

  componentWillReceiveProps({
    isLoading,
    isScriptLoaded,
    isScriptLoadSucceed
  }) {
    if (!isLoading) {
      // parent data container finished loading
      if (isScriptLoaded) {
        // script finished loading
        if (isScriptLoadSucceed) {
          this.setIsLoading(false)
        } else {
          this.setIsLoading(null)
        }
      }
    }
  }

  setIsLoading(isLoading) {
    this.setState(p => ({ isLoading }))
  }

  handleSuggestSelect = suggest => {
    const { onSuggestSelect } = this.props
    const { label, placeId, location, gmaps } = suggest

    if (location && location.lat && location.lng) {
      this.setState(p => ({ center: [location.lat, location.lng] }))
    }

    typeof onSuggestSelect === 'function' && onSuggestSelect(suggest)
  }

  render() {
    const { t, handleSubmit, onSubmit } = this.props

    const { center, isLoading } = this.state

    let content = null

    if (isLoading) {
      content = <span>{t('loading')}</span>
    } else if (process.env.NODE_ENV !== 'development' && isLoading === null) {
      content = <span>{t('form:failed_loading')}</span>
    } else {
      content = (
        <Grid verticalAlign="middle">
          <input
            name="city"
            component={GeosuggestField}
            breakpoints={breakpoints}
            id="city"
            center={center}
            label={t('form:setLocation.city')}
            skipSuggest={keepCities}
            t={t}
            validate={[required({ msg: t('errors:required') })]}
            onSuggestSelect={this.handleSuggestSelect}
          />

          <input name="department" component="input" type="hidden" />

          <input name="marker" component="input" type="hidden" />
        </Grid>
      )
    }

    return (
      <UIForm onSubmit={handleSubmit(onSubmit)}>
        <Modal.Content>{content}</Modal.Content>

        <Modal.Actions>
          <Button inverted type="submit">
            <Icon name="checkmark" /> {t('form:setLocation.save')}
          </Button>
        </Modal.Actions>
      </UIForm>
    )
  }
}

export default compose(
  scriptLoader(
    `https://maps.googleapis.com/maps/api/js?key=${
      process.env.REACT_APP_MAPS_API_KEY
    }&libraries=places`
  ),
  pure
)(SetLocationForm)
