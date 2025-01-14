import Image from "next/image"


function NavBar(){
    return(
        <section className="bg-[#D9D9D9] h-[91px] w-full pl-10 flex items-center">
            <Image
               src='/logo-flexxus.png'
               alt="logotipo de Flexxus"
               width={200}
               height={200}
               priority={true}
            />
        </section>
    )
}

export default NavBar