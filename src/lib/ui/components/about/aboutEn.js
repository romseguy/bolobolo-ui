import React from 'react'
import { TextIcon } from '@/lib/ui/components/icon'
import {
  Accordion,
  List,
  Message,
  Segment
} from '@/lib/ui/components/layout'

function AboutEn(props) {
  const { height } = props

  return (
    <Segment padded="very" style={{ minHeight: height - 40, margin: '20px' }}>
      <h1>What's the point of Pearrot?</h1>

      <p>
        Pearrot allows you to contribute easily to the gift economy by sending
        service offers and demands{' '}
        <strong>
          <em>through the places you are connected with</em>
        </strong>
        .
      </p>

      <h1>How?</h1>

      <p>Thanks to a Pearrot account, you can contribute:</p>

      <List celled>
        <List.Item>
          <p>
            <TextIcon name="pointing right" />
            <span style={{ color: 'green' }}>
              <strong>By connecting to a place added by someone else.</strong>
            </span>
          </p>
          Once your request is approved by the place's creator or one of its
          guardians, you can use the place's parrot to send a message (every 24
          hours) to the people:
          <List bulleted>
            <List.Item>connected to that place ;</List.Item>
            <List.Item>
              connected to the places belonging to the cities of your choice.
            </List.Item>
          </List>
        </List.Item>

        <List.Item>
          <p>
            <TextIcon name="pointing right" />
            <span style={{ color: 'green' }}>
              <strong>
                By adding either a place you own, or a place you know the owner
                agrees to become a part of the Pearrot network.
              </strong>
            </span>
          </p>
          Once your request is approved by Pearrot, you can:
          <List bulleted>
            <List.Item>
              Use the place's parrot to send messages (read above) ;
            </List.Item>
            <List.Item>
              Assign roles to people connecting to the place.
              <br />
              <Message positive style={{ marginBottom: '1rem' }}>
                <TextIcon name="lightbulb" />
                Specifically, people who can vote, in other words people who are
                most active. This role is important because the place's parrot
                cannot deliver a message until the <strong>unanimity</strong> of
                voting people is reached ;
              </Message>
            </List.Item>
            <List.Item>Accept or reject new connection requests.</List.Item>
          </List>
        </List.Item>
      </List>

      <h1>What else?</h1>

      <p>
        A parrot delivers a message without allowing the recipient to write
        back. While this is a nice way not to be disturbed, you can decide you
        need an answer by sending a pigeon instead of a parrot!
      </p>

      <p>Stay tuned for more...</p>
    </Segment>
  )
}

export default AboutEn
