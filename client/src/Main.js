import { Carousel, Image } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCircle,
  faCircleArrowUp,
  faCircleArrowDown,
  faExclamation
} from '@fortawesome/free-solid-svg-icons'
import { useTranslation } from 'react-i18next'

const Main = ({ data }) => {
  const { t, i18n } = useTranslation()
  return (
    <div className='monitor-main'>
      {/* <Image src='/L3.png' height={'480'} width={'640'} /> */}
      {data.L3 === 0 && <FontAwesomeIcon icon={faExclamation} size='2xl' />}
      {data.L3 === 1 && (
        <Carousel controls={false} indicators={false} interval={1000} fade>
          <Carousel.Item><FontAwesomeIcon icon={faCircleArrowUp} size='2xl' color='#198754' /></Carousel.Item>
          <Carousel.Item><span className='font-bold'>{t('drive-in')}</span></Carousel.Item>
        </Carousel>
      )}
      {data.L3 === 2 && (
        <Carousel controls={false} indicators={false} interval={1000} fade>
          <Carousel.Item><FontAwesomeIcon icon={faCircleArrowDown} size='2xl' color='#ffc107' /></Carousel.Item>
          <Carousel.Item><span className='font-bold'>{t('drive-back')}</span></Carousel.Item>
        </Carousel>
      )}
      {data.L3 === 1 && (
        <Carousel controls={false} indicators={false} interval={1000} fade>
          {/* <Carousel.Item><FontAwesomeIcon icon={faHand} size='2xl' color='#dc3545' className='fa-beat-fade fade-scale' /></Carousel.Item> */}
          <Carousel.Item><FontAwesomeIcon icon={faCircle} size='2xl' color='#dc3545' /></Carousel.Item>
          <Carousel.Item><span className='font-bold'>{t('stop')}</span></Carousel.Item>
        </Carousel>
      )}
    </div>
  )
}

export default Main