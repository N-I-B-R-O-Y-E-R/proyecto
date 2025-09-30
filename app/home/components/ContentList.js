// app/home/components/ContentList.js
'use client'; 
import { useRef } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react'; // Necesitas instalar lucide-react (npm install lucide-react)

// Componente para una fila de contenido horizontal con flechas de navegación
export default function ContentList({ title, contentItems }) {
    // Referencia al contenedor de la lista para controlar el scroll
    const listRef = useRef(null); 

    if (!contentItems || contentItems.length === 0) {
        return null;
    }

    // Función para mover el carrusel
    const scrollList = (direction) => {
        if (listRef.current) {
            // Calcula cuánto mover: 80% del ancho visible
            const scrollAmount = listRef.current.clientWidth * 0.8; 
            
            listRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth', // Desplazamiento suave
            });
        }
    };

    return (
        <div className="mb-10 relative group"> {/* 'relative group' para posicionar flechas y hacerlas visibles en hover */}
            <h2 className="text-xl md:text-2xl font-bold mb-4 text-white">
                {title}
            </h2>
            
            {/* Contenedor principal del carrusel */}
            <div 
                ref={listRef} // Asignamos la referencia
                className="flex overflow-x-scroll space-x-4 pb-4 custom-scrollbar"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }} 
            >
                {contentItems.map((item) => (
                    <Link href={`/details/${item.id}`} key={item.id}>
                        <div 
                            className="flex-shrink-0 w-40 md:w-56 h-auto cursor-pointer rounded-lg shadow-xl 
                                transition-all duration-300 transform 
                                hover:scale-[1.07] hover:border-4 hover:border-gray-100 hover:shadow-cyan-500/30"
                        >
                            <img
                                src={item.card_image_url || item.poster_url}
                                alt={item.title}
                                className="w-full h-full object-cover rounded-lg"
                                style={{ aspectRatio: '16/9' }} 
                            />
                        </div>
                    </Link>
                ))}
            </div>

            {/* Flecha Izquierda */}
            <button
                onClick={() => scrollList('left')}
                className="absolute left-0 top-1/2 -mt-10 md:-mt-12 w-10 h-20 bg-black/70 text-white z-50 
                           flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
                <ChevronLeft className="w-6 h-6" />
            </button>
            
            {/* Flecha Derecha */}
            <button
                onClick={() => scrollList('right')}
                className="absolute right-0 top-1/2 -mt-10 md:-mt-12 w-10 h-20 bg-black/70 text-white z-50 
                           flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
                <ChevronRight className="w-6 h-6" />
            </button>
        </div>
    );
}