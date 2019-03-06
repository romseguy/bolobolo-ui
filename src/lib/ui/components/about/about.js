import React from 'react'
import { TextIcon } from '@/lib/ui/components/icon'
import {
  Accordion,
  List,
  Message,
  Segment
} from '@/lib/ui/components/layout'
import AboutEn from './aboutEn'

function About(props) {
  const { currentLang, height } = props

  if (currentLang === 'en') {
    return <AboutEn {...props} />
  }

  return (
    <Segment
      padded="very"
      style={{ minHeight: height - 40, margin: '20px', textAlign: 'justify' }}
    >
      <h3>À quoi sert Pairroquet ?</h3>

      <p>
        Pairroquet vous permet de contribuer facilement à l'économie du don, en
        envoyant propositions et demandes de service{' '}
        <strong>
          <em>par l'intermédiaire des lieux auxquels vous êtes connecté</em>
        </strong>
        .
      </p>

      <h3>Comment ?</h3>

      <p>En créant un compte Pairroquet, vous pouvez contribuer :</p>

      <List celled>
        <List.Item>
          <p>
            <TextIcon name="pointing right" />
            <span style={{ color: 'green' }}>
              <strong>
                En vous connectant à un lieu ajouté par une autre personne.
              </strong>
            </span>
          </p>
          Une fois votre demande acceptée par le créateur du lieu ou l'un de ses
          gardiens, vous disposez du perroquet de ce lieu pour envoyer un
          message (toutes les 24 heures) aux personnes :
          <List bulleted>
            <List.Item>connectées à ce même lieu ;</List.Item>
            <List.Item>
              connectées aux lieux appartenant aux villes de votre choix.
            </List.Item>
          </List>
        </List.Item>

        <List.Item>
          <p>
            <TextIcon name="pointing right" />
            <span style={{ color: 'green' }}>
              <strong>
                En ajoutant un lieu dont vous êtes propriétaire ou gardien.
              </strong>
            </span>
          </p>
          Une fois votre demande acceptée par Pairroquet, vous pouvez :
          <List bulleted>
            <List.Item>
              Utiliser le perroquet du lieu pour envoyer des messages (cf.
              ci-dessus) ;
            </List.Item>
            <List.Item>
              Attribuer les rôles aux gens qui se connectent au lieu.
              <br />
              <Message positive style={{ marginBottom: '1rem' }}>
                <TextIcon name="lightbulb" />
                En particulier, les personnes votantes, c'est à dire les
                personnes contribuant le plus activement à la vie du lieu. Ce
                rôle est important car le perroquet du lieu ne peut pas délivrer
                un message si{' '}
                <strong>
                  <em>l'unanimité</em>
                </strong>{' '}
                des personnes votantes n'est pas atteinte ;
              </Message>
            </List.Item>
            <List.Item>
              Accepter ou refuser les nouvelles demandes de connexion.
            </List.Item>
          </List>
        </List.Item>
      </List>

      <h3>Quoi de plus ?</h3>

      <p>
        Un perroquet délivre un message sans proposer au destinataire de
        répondre. Bien que ce soit une bonne façon de ne pas être dérangé, vous
        pouvez décider d'avoir besoin d'une réponse en envoyant un pigeon à la
        place d'un perroquet!
      </p>

      <p>Et bien plus à venir...</p>

      {/*
       <List>
       <List.Item>
       Envoyer une demande de connexion aux lieux que vous connaissez et qui ont été ajouté à Pairroquet. Si votre demande de connexion est acceptée par le propriétaire du lieu, vous aurez accès :

       <List bulleted>
       <List.Item>
       au perroquet du lieu, qui vous permettra d'envoyer offres et demandes de service aux lieux situés à proximité ;
       </List.Item>
       <List.Item>
       à l'historique des offres et demandes de service envoyées à ce lieu ;
       </List.Item>
       <List.Item>
       aux notifications correspondantes aux nouvelles demandes et offres de services envoyées au lieu.
       </List.Item>
       </List>
       </List.Item>

       <List.Item>
       Ajouter votre lieu ou un lieu que vous connaissez à Pairroquet. Si le lieu est accepté par Pairroquet, vous aurez accès :

       <List bulleted>
       <List.Item>
       au perroquet du lieu, qui vous permettra d'envoyer offres et demandes de service aux lieux situés à proximité ;
       </List.Item>
       <List.Item>
       aux fonctionnalités d'administration vous permettant d'accepter les demandes de connexion des personnes travaillant avec vous. </List.Item>
       </List>
       </List.Item>
       </List>
       */}
    </Segment>
  )
}

export default About
