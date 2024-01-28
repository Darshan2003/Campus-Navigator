import React from 'react'
import Modal from '../Modal'
import img from '../static/rotate.png'
export default function ChangeOrientationModal({ setShowModal}) {
  return (
    <Modal title={'Landscape Mode'} setShowModal={setShowModal}>
        <p>For an better experience, please rotate your device to landscape mode and refresh the page. Enjoy!</p>
      <img src={img} alt="rotate device" width={120} height={120} className='mt-5 mx-auto' />
    </Modal>
  )
}
