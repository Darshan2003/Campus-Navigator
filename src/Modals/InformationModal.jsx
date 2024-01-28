import React from 'react'
import Modal from '../Modal'

export default function InformationModal({ setShowModal }) {
    return (
        <Modal title={'About'} setShowModal={setShowModal}>
            <div className="text-center p-5">
                <h2 className="text-2xl font-bold mb-4">Welcome to Campus Navigator! 🎉</h2>
                <p className="text-left">
                    Here's how you can navigate:
                </p>
                <ol className="list-decimal list-inside text-left mb-4">
                    <li>Select the Start Location from the first dropdown.</li>
                    <li>Select the Target Location from the second dropdown.</li>
                    <li>Press the Glowing Direction Icon: This will calculate the shortest path between your chosen locations.</li>
                </ol>
                <p className="text-left">
                    Ready to move? You have two options:
                </p>
                <ul className="list-disc list-inside text-left mb-4">
                    <li>Click on the Icon located at the bottom left corner.</li>
                    <li>Press the <kbd>W</kbd> key on your keyboard.</li>
                </ul>
                <p className="text-left">
                    Enjoy exploring!
                </p>
            </div>
        </Modal>
    )
}
