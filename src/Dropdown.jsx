import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import * as THREE from 'three'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const locationDict = {
    V201: [0.5917979935891569, -0.006638143104230387, -10.146003535474863],
    V202: [-5.7224310702215675, -0.0066341790621962105, -30.07634378666178],
    V203: [-6.746381806644152, -0.024903026580630705, -49.675460097709134],
    V207: [3.243655821076471, -0.006628434812418149, -59.18505494782773],
    V208: [3.1968889723014557, -0.006632253929140575, -39.98973647773787],
    V209: [3.1011253987598284, -0.0066360787782340225, -20.72270472647906],
    EXIT: [0.222069319575958, -0.006639923137452541, -0.9380304139976019]
}
export default function Dropdown({ setLocation, label, setLabel, classes, characterPosition, setIsPathChanged }) {
    return (
        <div className={classes}>
            {/* bg-blue-800 bg-opacity-80 */}
           

            <Menu as="div" className="relative inline-block text-left">
                <div>
                    <Menu.Button className="inline-flex w-fit  justify-center gap-x-1.5 rounded-md bg-blue-800 bg-opacity-80 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-800">
                        {label}
                        <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
                    </Menu.Button>
                </div>

                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-[79px] origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="py-1">
                            <Menu.Item>
                                {({ active }) => (
                                    <button
                                        onClick={() => {
                                            if(characterPosition?.current?.position)
                                            {
                                                setLocation(characterPosition.current.position);
                                            }
                                            setLabel('Here');
                                            setIsPathChanged(1);
                                        }}
                                        className={classNames(
                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                            'block px-4 py-2 text-sm'
                                        )}
                                    >
                                        Here
                                    </button>
                                )}
                            </Menu.Item>
                            <Menu.Item>
                                {({ active }) => (
                                    <button
                                        onClick={() => {
                                            setLocation(new THREE.Vector3(...locationDict.V201));
                                            setLabel('V201');
                                            setIsPathChanged(1);
                                        }}
                                        className={classNames(
                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                            'block px-4 py-2 text-sm'
                                        )}
                                    >
                                        V201
                                    </button>
                                )}
                            </Menu.Item>
                            <Menu.Item>
                                {({ active }) => (
                                    <button
                                        onClick={() => {
                                            setLocation(new THREE.Vector3(...locationDict.V202));
                                            setLabel('V202');
                                            setIsPathChanged(1);
                                        }}
                                        className={classNames(
                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                            'block px-4 py-2 text-sm'
                                        )}
                                    >
                                        V202
                                    </button>
                                )}
                            </Menu.Item>
                            <Menu.Item>
                                {({ active }) => (
                                    <button
                                        onClick={() => {
                                            setLocation(new THREE.Vector3(...locationDict.V203));
                                            setLabel('V203');
                                            setIsPathChanged(1);
                                        }}
                                        className={classNames(
                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                            'block px-4 py-2 text-sm'
                                        )}
                                    >
                                        V203
                                    </button>
                                )}
                            </Menu.Item>
                            <Menu.Item>
                                {({ active }) => (
                                    <button
                                        onClick={() => {
                                            setLocation(new THREE.Vector3(...locationDict.V207));
                                            setLabel('V207');
                                            setIsPathChanged(1);
                                        }}
                                        className={classNames(
                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                            'block px-4 py-2 text-sm'
                                        )}
                                    >
                                        V207
                                    </button>
                                )}
                            </Menu.Item>
                            <Menu.Item>
                                {({ active }) => (
                                    <button
                                        onClick={() => {
                                            setLocation(new THREE.Vector3(...locationDict.V208));
                                            setLabel('V208');
                                            setIsPathChanged(1);
                                        }}
                                        className={classNames(
                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                            'block px-4 py-2 text-sm'
                                        )}
                                    >
                                        V208
                                    </button>
                                )}
                            </Menu.Item>
                            <Menu.Item>
                                {({ active }) => (
                                    <button
                                        onClick={() => {
                                            setLocation(new THREE.Vector3(...locationDict.V209));
                                            setLabel('V209');
                                            setIsPathChanged(1);
                                        }}
                                        className={classNames(
                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                            'block px-4 py-2 text-sm'
                                        )}
                                    >
                                        V209
                                    </button>
                                )}
                            </Menu.Item>
                            <Menu.Item>
                                {({ active }) => (
                                    <button
                                        onClick={() => {
                                            setLocation(new THREE.Vector3(...locationDict.EXIT));
                                            setLabel('Exit');
                                            setIsPathChanged(1);
                                        }}
                                        className={classNames(
                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                            'block px-4 py-2 text-sm'
                                        )}
                                    >
                                        Exit
                                    </button>
                                )}
                            </Menu.Item>
                        </div>
                    </Menu.Items>
                </Transition>
            </Menu>

        </div>
    )
}
