import React from 'react'
import { NavLink as Link } from 'redux-first-router-link'

import Icon from '@/lib/ui/components/icon'
import { Accordion, List, Message, Segment } from '@/lib/ui/components/layout'
import { ToolboxButton } from '@/lib/ui/components/toolbox'

import { TextIcon } from '@/lib/ui/components/icon'

function Tutorial({ currentUser, routes, t }) {
  const entity = (
    <TextIcon
      alt="Entité"
      name="eye"
      title="Entité"
      style={{ display: 'inline-block' }}
    />
  )
  const entities = (
    <span>
      {entity}
      {entity}
    </span>
  )

  const parrot = <TextIcon alt="Perroquet" name="parrot" title="Perroquet" />
  const parrots = (
    <span>
      {parrot}
      {parrot}
    </span>
  )
  const yourParrot = (
    <Link target="_blank" to={routes.meRoute()}>
      votre {parrot}
    </Link>
  )

  const whiteBoard = (
    <span
      title="la conscience de votre perroquet :)"
      style={{
        borderBottom: '1px dashed #999',
        cursor: 'default',
        display: 'inline-block'
      }}
    >
      tableau blanc
    </span>
  )

  const edit = <Icon id="edit" title="Mode édition" />
  const mouseDrag = (
    <TextIcon alt="Glissez-déposez" name="mouseDrag" title="Glissez-déposez" />
  )
  const mouseLeftClick = (
    <TextIcon alt="Click gauche" name="mouseLeftClick" title="Click gauche" />
  )

  const entitiesButton = (
    <ToolboxButton
      active={false}
      iconName="eye"
      label={t('canvas:entities.label_plural')}
      title={t('canvas:entities.add')}
      toggle={true}
    />
  )

  const symbolsButton = (
    <ToolboxButton
      active={false}
      iconName="bullseye"
      label={t('canvas:symbols.label') + 's'}
      title={t('canvas:symbols.add')}
      toggle={true}
    />
  )

  const panels = [
    {
      key: 'a',
      title: <span>Envoyer un message à un {parrot} de votre choix.</span>,
      content: (
        <List ordered style={{ marginLeft: '3rem' }}>
          <List.Item>
            Activez le mode notification <Icon id="volume" />
          </List.Item>
          <List.Item>
            {mouseLeftClick} sur l'{entity} de votre choix
          </List.Item>
        </List>
      )
    },
    {
      key: 'b',
      title: (
        <span>
          Envoyer un message aux {parrots} qui reconnaissent votre {parrot}.
        </span>
      ),
      content: (
        <List ordered style={{ marginLeft: '3rem' }}>
          <List.Item>Activez le mode édition {edit}</List.Item>
          <List.Item style={{ padding: '1rem 0' }}>
            Ouvrez le menu {symbolsButton}
          </List.Item>
          <List.Item>
            {mouseDrag} sur le {whiteBoard} les <strong>symboles</strong>{' '}
            correspondant aux messages que votre {parrot} répètera aux {parrots}{' '}
            qui le reconnaissent.
          </List.Item>
        </List>
      )
    }
  ]

  return (
    <Segment padded="very" style={{ margin: '1rem' }}>
      <p>
        Pour commencer, lisez{' '}
        <Link target="_blank" to={routes.aboutRoute()}>
          {t('app_title')} {t('about')}
        </Link>
      </p>

      {currentUser !== null && (
        <div>
          <p>
            Apprenons maintenant à {yourParrot} à <strong>reconnaitre</strong>{' '}
            les {parrots} incarnés par d'autres {entities}:
          </p>

          <Segment>
            <List ordered>
              <List.Item>Activez le mode édition {edit}</List.Item>
              <List.Item style={{ padding: '1rem 0' }}>
                Ouvrez le menu {entitiesButton}
              </List.Item>
              <List.Item>
                {mouseDrag} sur le {whiteBoard} les {entities}que votre {parrot}{' '}
                saura reconnaitre.
              </List.Item>
            </List>
          </Segment>

          <Message
            icon="lightbulb"
            content={
              <span>
                En reconnaissant les autres {parrots} votre {parrot} pourra vous
                répéter les messages qu'ils envoient sous la forme que vous avez
                choisi (push notification, email, etc).
              </span>
            }
          />

          <p>Un choix s'offre maintenant à vous et votre {parrot} :</p>

          <Segment>
            <Accordion panels={panels} exclusive={false} fluid />
          </Segment>
        </div>
      )}
    </Segment>
  )
}

export default Tutorial
