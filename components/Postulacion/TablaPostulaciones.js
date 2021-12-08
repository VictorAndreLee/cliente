import React from 'react';
import Image from "next/dist/client/image";
import Link from 'next/link';
import pdf from "../../img/pdf.svg";

const TablaPostulaciones = ({item}) => {
    const {
        nombreApoderado,
        apellidoApoderado,
        creado,
        estadoPostulacion,
        copias
    } = item;
    console.log(copias);
    return (
        <tr>
            <td className="border px-4 py-2">{nombreApoderado} {apellidoApoderado}</td>
            <td className="border px-4 py-2">
                <Link href={copias[0]}>
                    <a className="cursor-pointer" >
                        <Image src={pdf} alt="archivo 1" />  
                    </a>
                </Link>
                <Link href={copias[1]}>
                    <a className="cursor-pointer">
                        <Image src={pdf} alt="archivo 2"/>  
                    </a>
                </Link>
                <Link href={copias[2]}>
                    <a className="cursor-pointer">
                        <Image src={pdf} alt="archivo 3" />  
                    </a>
                </Link>
            </td>
            <td className="border px-4 py-2">
                {creado}
            </td>
        </tr>
    )
}

export default TablaPostulaciones
