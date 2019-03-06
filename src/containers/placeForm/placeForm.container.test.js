import { placeToNode } from '@/utils/nodes'

import { handlers } from './placeForm.container'

const routes = {
  mePlaceEditRoute: jest.fn(),
  meRoute: jest.fn()
}

const setNodes = jest.fn()

const idServer = 0
const selectedNode = {
  id: 2,
  selected: true,
  x: 10,
  y: 10
}
const expectedPlace = {
  city: 'Lourdes',
  title: 'yolo',
  department: 'Hautes-Pyrénées',
  latitude: 43.094714,
  longitude: -0.045657
}
const expectedNode = placeToNode(
  0,
  { ...expectedPlace, id: idServer },
  { mine: true }
)
const expectedSelectedNode = placeToNode(
  selectedNode.id,
  {
    ...expectedPlace,
    id: idServer,
    x: selectedNode.x,
    y: selectedNode.y
  },
  { mine: true }
)

describe('placeFormContainer', () => {
  describe('placeFormContainer.handlers', () => {
    describe('placeFormContainer.handlers.onSubmit', () => {
      describe('create', () => {
        // 00
        test('without marker and without selected node', async () => {
          let props = {
            nodes: [],
            routes,
            setNodes,
            doCreatePlace: jest.fn(({ place }) =>
              Promise.resolve({
                data: {
                  createPlace: {
                    id: idServer,
                    title: 'yolo'
                  }
                }
              })
            )
          }
          let formValues = {
            action: 'create',
            city: 'Lourdes',
            title: 'yolo'
          }
          handlers.onSubmit(props)(formValues)

          /*          expect(props.doCreatePlace).toBeCalledWith({place: expectedPlace})
          expect(routes.mePlaceEditRoute).toBeCalledWith(formValues.title)
          expect(props.setNodes).toBeCalledWith([expectedNode])*/
        })

        // 01
        /*        test('without marker and with selected node', async () => {
          props = {
            ...props,
            nodes: [selectedNode]
          }

          await handlers.onSubmit(props)(formValues)

          expect(props.doCreatePlace).toBeCalledWith({place: expectedPlace})
          expect(routes.mePlaceEditRoute).toBeCalledWith(formValues.title)
          expect(props.setNodes).toBeCalledWith([expectedSelectedNode])
        })

        // 10
        test('with marker and without selected node', async () => {
          formValues = {
            ...formValues,
            marker: [43.094714, -0.045657]
          }

          await handlers.onSubmit(props)(formValues)

          expect(props.doCreatePlace).toBeCalledWith({place: expectedPlace})
          expect(routes.mePlaceEditRoute).toBeCalledWith(formValues.title)
          expect(props.setNodes).toBeCalledWith([expectedNode])
        })

        // 11
        test('with marker and with selected node', async () => {
          formValues = {
            ...formValues,
            marker: [43.094714, -0.045657]
          }
          props = {
            ...props,
            nodes: [selectedNode]
          }

          await handlers.onSubmit(props)(formValues)

          expect(props.doCreatePlace).toBeCalledWith({place: expectedPlace})
          expect(routes.mePlaceEditRoute).toBeCalledWith(formValues.title)
          expect(props.setNodes).toBeCalledWith([expectedSelectedNode])
        })*/
      })

      describe('select', () => {
        let formValues = {
          action: 'select',
          selectedPlaceTitle: 'yolo'
        }
        let props = {
          client: {
            query: jest.fn(({ query, variables }) =>
              Promise.resolve({
                data: {
                  place: {
                    ...expectedPlace,
                    id: idServer
                  }
                }
              })
            )
          },
          doCreateUserPlace: jest.fn(({ userPlace }) => Promise.resolve()),
          nodes: [],
          routes,
          setNodes
        }

        /*        test('without selected node', async () => {
          await handlers.onSubmit(props)(formValues)

          const userPlace ={
            placeId: idServer,
            roleId: roleTypes.FOLLOWER
          }

          expect(props.doCreateUserPlace).toBeCalledWith({userPlace})
          expect(routes.meRoute).toBeCalled()
          expect(props.setNodes).toBeCalledWith([expectedNode])
        })*/
      })
    })
  })
})
