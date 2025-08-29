import {
  memo,
  type PropsWithChildren,
  useCallback,
  useEffect,
  useRef,
  useState
} from 'react'
import { domAnimation, LazyMotion, m } from 'motion/react'
import Swipe, { type SwipePosition } from 'react-easy-swipe'
import { RemoveScroll } from 'react-remove-scroll'
import { useMeasure } from 'react-use'

import { Box, Flex, Portal, Text } from '@chakra-ui/react'

const variants = {
  initial: { opacity: 0, x: 0, y: 10, zIndex: 2 },
  in: { opacity: 1, x: 0, y: 0, zIndex: 2 }
}
const viewTransition = {
  ease: 'linear',
  duration: 0.25
}
const MIN_Y_SWIPE_TO_CLOSE = 15
const HEIGHT_OF_SWIPING_HANDLER = 24

interface IProps extends PropsWithChildren {
  isOpen: boolean
  onClose: () => void
  onCloseComplete?: () => void
  borderRadius?: string
  portalProps?: {
    appendToParentPortal?: boolean
    containerRef?: React.RefObject<HTMLElement | null> | undefined
  }
}

export const MobileBottomDrawer = memo(
  ({
    isOpen,
    onClose,
    children,
    onCloseComplete,
    borderRadius = '1rem',
    portalProps = {}
  }: IProps) => {
    const [drawerContentRef, { height }] = useMeasure()
    const [isOpenDeffer, setIsOpenDeffer] = useState(false)
    const [swipeY, setSwipeY] = useState(0)
    const [isSwiping, setIsSwiping] = useState(false)
    const swipeContentRef = useRef<HTMLElement | null>(null)
    const swipingDir = useRef<'up' | 'down' | null>(null)

    const drawerContentRefCb = useCallback((node: HTMLElement) => {
      if (node !== null) {
        swipeContentRef.current = node
        drawerContentRef(node)
      }
    }, [])

    const onSwipeStart = () => {
      setSwipeY(0)
      setIsSwiping(true)
    }

    const onSwipeMove = (position: SwipePosition) => {
      if (swipeContentRef.current) {
        const maxY =
          (swipeContentRef.current as HTMLElement).getBoundingClientRect()
            .height - HEIGHT_OF_SWIPING_HANDLER
        setSwipeY((prevState) => {
          swipingDir.current = prevState < position.y ? 'down' : 'up'
          return position.y < 0 ? 0 : position.y > maxY ? maxY : position.y
        })
      }
    }

    const onSwipeEnd = () => {
      setIsSwiping(false)
      if (swipeY >= MIN_Y_SWIPE_TO_CLOSE && swipingDir.current === 'down') {
        onClose()
      } else {
        setSwipeY(0)
      }
    }

    const handleTransitionEnd = (event: any) => {
      if (event.propertyName === 'bottom') {
        if (!isOpenDeffer) {
          onCloseComplete?.()
        }
      }
    }

    useEffect(() => {
      setIsOpenDeffer(isOpen)

      return () => {
        setSwipeY(0)
        setIsSwiping(false)
      }
    }, [isOpen])

    return (
      <RemoveScroll enabled={isOpen}>
        <Portal {...portalProps}>
          <Flex
            position="fixed"
            left="0"
            top={0}
            h="full"
            transition=".3s"
            w="full"
            zIndex={10000}
            bg="#00000099"
            backdropFilter="blur(3px)"
            visibility={isOpen ? 'visible' : 'hidden'}
            sx={{
              overscrollBehaviorY: 'contain'
            }}
            onClick={onClose}
          >
            <Box
              onClick={(e) => e.stopPropagation()}
              sx={{
                overscrollBehaviorY: 'contain'
              }}
              ref={drawerContentRefCb as never}
              position="relative"
              w="full"
              mt="auto"
              display="flex"
              flexDir="column"
              alignItems="center"
              borderTopLeftRadius={borderRadius}
              borderTopRightRadius={borderRadius}
              bgColor="gray.10"
              willChange="bottom"
              onTransitionEnd={handleTransitionEnd}
              transition={isSwiping ? '0s' : '.3s'}
              {...(isOpenDeffer
                ? {
                    bottom: `${-swipeY}px`,
                    opacity: '1',
                    visibility: 'visible',
                    zIndex: 22
                  }
                : {
                    visibility: 'hidden',
                    bottom: `${height ? -height + 'px' : '-100%'}`,
                    opacity: '0',
                    zIndex: -1
                  })}
            >
              <Box
                py={4}
                px={8}
                w="full"
                as={Swipe}
                onSwipeStart={onSwipeStart}
                onSwipeMove={onSwipeMove}
                onSwipeEnd={onSwipeEnd}
                display="inline-flex"
                justifyContent="center"
              >
                <Text
                  as="span"
                  w="4rem"
                  h=".4rem"
                  display="block"
                  rounded=".4rem"
                  bgColor="gray.150"
                />
              </Box>
              <Box w="full">
                <LazyMotion features={domAnimation}>
                  <m.main
                    initial="initial"
                    animate="in"
                    variants={variants}
                    transition={viewTransition as never}
                  >
                    {children}
                  </m.main>
                </LazyMotion>
              </Box>
            </Box>
          </Flex>
        </Portal>
      </RemoveScroll>
    )
  }
)
