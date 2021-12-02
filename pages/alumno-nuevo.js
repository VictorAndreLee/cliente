import React from 'react';
import Layout from '../components/PageComponents/LayoutPage'
import Link from 'next/dist/client/link';
import RegistroApoderado from '../components/PageComponents/RegistroApoderado';
import ApoderadoLogin from '../components/PageComponents/ApoderadoLogin';

const AlumnoNuevo = () => {
    return (
        <Layout>
            <div className="md:w-4/5 xl:w-3/5 h-full mt-12 mx-auto mb-32 bg-opacity-20">
                <div className="lg:flex md:shadow-lg p-5 bg-white rounded-lg py-14">

                    <RegistroApoderado />
                  
                    <ApoderadoLogin />
                </div>
            </div>
        </Layout>
    )
}

export default AlumnoNuevo
