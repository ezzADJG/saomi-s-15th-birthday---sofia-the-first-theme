import React from 'react';
import { 
    COLORS, 
    CrownIcon, 
    ButterflyIcon, 
    CalendarIcon, 
    ClockIcon, 
    MapPinIcon, 
    DressIcon, 
    HeartIcon, 
    CastleIcon,
    EnvelopeIcon,
    WhatsAppIcon
} from '../constants';
import { Placeholder, AnimatedElement, RoyalDivider, AmuletDecoration } from './Visuals';

interface PageContentProps {
  type: string;
  isActive: boolean;
}

const DecorativeBorder = () => (
  <div className="absolute inset-3 border-[3px] border-double border-[#D4AF37] rounded-lg pointer-events-none z-10 flex flex-col justify-between">
    {/* Corner Ornaments */}
    <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-[#D4AF37] rounded-tl-xl"></div>
    <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-[#D4AF37] rounded-tr-xl"></div>
    <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-[#D4AF37] rounded-bl-xl"></div>
    <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-[#D4AF37] rounded-br-xl"></div>
    
    {/* Pearl dots simulation */}
    <div className="absolute inset-[-4px] border border-dotted border-[#F5C6E8]/50 rounded-xl pointer-events-none"></div>
  </div>
);

export const PageContent: React.FC<PageContentProps> = ({ type, isActive }) => {
  // Styles mimicking a royal storybook page
  const paperStyle = "relative w-full h-full bg-[#FFF8F0] p-6 flex flex-col overflow-hidden shadow-inner bg-[radial-gradient(#F5C6E8_1px,transparent_1px)] [background-size:20px_20px]";
  
  // Vignette for depth
  const vignette = <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_50%,rgba(107,70,193,0.05)_100%)] pointer-events-none z-0"></div>;

  // Base Delay Logic: 
  // If it's the cover, we want it to show up relatively quickly on first load (but if flipping back, delay is fine).
  // If it's an inner page, we MUST wait for the page flip (approx 800ms-1000ms visual clearance) before animating.
  const BASE_DELAY = type === 'cover' ? 200 : 1000;

  switch (type) {
    case 'cover':
      return (
        <div className="relative w-full h-full bg-[#553C9A] p-1 flex flex-col items-center justify-center border-l-4 border-[#2D3748] shadow-2xl overflow-hidden">
          {/* Texture Overlay */}
          <div className="absolute inset-0 opacity-30 bg-[url('https://www.transparenttextures.com/patterns/purty-wood.png')] mix-blend-multiply"></div>
          
          {/* Ornate Frame */}
          <div className="absolute inset-4 border-[6px] border-[#D4AF37] rounded-lg flex items-center justify-center shadow-[inset_0_0_20px_rgba(0,0,0,0.5)]">
             <div className="absolute inset-1 border border-[#D4AF37] opacity-50 rounded sm-border-dotted"></div>
          </div>
          
          <div className="z-10 text-center p-4 relative w-full h-full flex flex-col justify-center items-center">
            
            <AnimatedElement isActive={isActive} delay={BASE_DELAY + 300} animation="zoom" className="mb-4">
               <div className="relative">
                  <div className="absolute -inset-4 bg-[#D4AF37] opacity-20 blur-xl rounded-full"></div>
                  <CrownIcon className="w-20 h-20 text-[#FFD700] drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]" />
               </div>
            </AnimatedElement>
            
            <AnimatedElement isActive={isActive} delay={BASE_DELAY + 800} animation="slide">
               <h2 className="font-['Cinzel_Decorative'] text-sm text-[#E8B4D9] tracking-[0.3em] uppercase mb-2 font-bold text-glow-purple">
                  Invitación Real
               </h2>
            </AnimatedElement>

            <AnimatedElement isActive={isActive} delay={BASE_DELAY + 1300} animation="fade">
              <h1 className="font-['Great_Vibes'] text-6xl text-[#FFD700] drop-shadow-lg leading-tight mb-2 text-glow-gold">
                Mis 15
                <br/>
                <span className="text-4xl">Años</span>
              </h1>
            </AnimatedElement>

            <AnimatedElement isActive={isActive} delay={BASE_DELAY + 1800} animation="slide">
               <div className="w-32 h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent my-4 mx-auto"></div>
              <h2 className="font-['Cinzel_Decorative'] text-2xl text-white font-bold tracking-wider drop-shadow-md text-shadow-sm">
                SAOMI KRYSTEL
              </h2>
               <div className="w-32 h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent my-4 mx-auto"></div>
            </AnimatedElement>
            
            <AnimatedElement isActive={isActive} delay={BASE_DELAY + 2500} animation="fade">
              <p className="font-['Playfair_Display'] text-[#F5C6E8] italic text-sm mt-6 max-w-[80%] mx-auto border-t border-[#F5C6E8]/30 pt-4">
                "Un cuento mágico está por comenzar..."
              </p>
            </AnimatedElement>
          </div>
          
          <div className="absolute bottom-0 w-full h-24 bg-gradient-to-t from-black/40 to-transparent pointer-events-none"></div>
        </div>
      );

    case 'intro':
      return (
        <div className={paperStyle}>
          {vignette}
          <DecorativeBorder />
          <AmuletDecoration />
          <div className="z-10 flex flex-col h-full text-center pt-12 pb-8 relative">
             <AnimatedElement isActive={isActive} delay={BASE_DELAY + 200} animation="fade">
                <div className="font-['Great_Vibes'] text-5xl text-[#6B46C1] drop-shadow-sm text-glow-purple mb-2">Había una vez...</div>
             </AnimatedElement>

             <div className="flex-grow flex flex-col justify-center items-center gap-6 w-full">
                <AnimatedElement isActive={isActive} delay={BASE_DELAY + 500} animation="zoom">
                  <Placeholder label="Saomi Niña" dimensions="Cuadrada" seed={101} className="h-36 w-36 mx-auto rounded-full border-[3px] border-[#D4AF37] shadow-xl ring-4 ring-[#E8B4D9]/30" />
                </AnimatedElement>
                
                <AnimatedElement isActive={isActive} delay={BASE_DELAY + 900} animation="slide" className="w-full px-4">
                  <div className="relative max-w-[85%] mx-auto">
                    <div className="absolute -left-4 -top-4 text-4xl opacity-30 text-[#D4AF37] font-serif">❝</div>
                    <p className="font-['Playfair_Display'] text-[#44337A] text-base italic leading-relaxed font-medium px-2">
                      ...una pequeña princesa que soñaba con su gran día. Hoy, el sueño se hace realidad.
                    </p>
                    <div className="absolute -right-4 -bottom-4 text-4xl opacity-30 text-[#D4AF37] font-serif">❞</div>
                  </div>
                </AnimatedElement>

                <AnimatedElement isActive={isActive} delay={BASE_DELAY + 1200} animation="zoom">
                  <Placeholder label="Saomi Actual" dimensions="Retrato" seed={152} className="h-44 w-36 mx-auto shadow-lg border-2 border-white rounded-md" />
                </AnimatedElement>
             </div>
          </div>
        </div>
      );

    case 'details':
      return (
        <div className={paperStyle}>
          {vignette}
          <DecorativeBorder />
          <div className="z-10 flex flex-col h-full items-center text-center pt-8 pb-4 relative">
            {/* Background pattern specific to details */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-5 pointer-events-none">
                <CrownIcon className="w-64 h-64 text-[#6B46C1]" />
            </div>

            <AnimatedElement isActive={isActive} delay={BASE_DELAY + 200} animation="slide">
              <h2 className="font-['Cinzel_Decorative'] text-2xl text-[#6B46C1] font-bold tracking-widest mb-1 text-shadow-sm">La Celebración</h2>
              <RoyalDivider className="mb-6"/>
            </AnimatedElement>

            <div className="w-full space-y-4 px-2">
              {/* Date Card */}
              <AnimatedElement isActive={isActive} delay={BASE_DELAY + 600} animation="slide">
                  <div className="bg-white/80 border border-[#E8B4D9] rounded-lg p-3 shadow-sm flex items-center gap-4 relative overflow-hidden backdrop-blur-sm">
                      <div className="bg-[#6B46C1]/10 p-3 rounded-full">
                          <CalendarIcon className="w-6 h-6 text-[#6B46C1]" />
                      </div>
                      <div className="text-left z-10">
                          <p className="font-['Cinzel'] text-[10px] text-gray-500 uppercase tracking-widest font-bold">Fecha Real</p>
                          <p className="font-['Playfair_Display'] text-xl font-bold text-[#2D3748]">Viernes 27 Dic</p>
                      </div>
                      <div className="absolute -right-4 -bottom-4 opacity-10">
                          <CalendarIcon className="w-20 h-20 text-[#6B46C1]" />
                      </div>
                  </div>
              </AnimatedElement>

              {/* Time Card */}
              <AnimatedElement isActive={isActive} delay={BASE_DELAY + 1000} animation="slide">
                  <div className="bg-white/80 border border-[#E8B4D9] rounded-lg p-3 shadow-sm flex items-center gap-4 relative overflow-hidden backdrop-blur-sm">
                      <div className="bg-[#6B46C1]/10 p-3 rounded-full">
                          <ClockIcon className="w-6 h-6 text-[#6B46C1]" />
                      </div>
                      <div className="text-left z-10">
                          <p className="font-['Cinzel'] text-[10px] text-gray-500 uppercase tracking-widest font-bold">Hora del Baile</p>
                          <p className="font-['Playfair_Display'] text-xl font-bold text-[#2D3748]">8:00 PM</p>
                      </div>
                  </div>
              </AnimatedElement>

              {/* Special Moment */}
              <AnimatedElement isActive={isActive} delay={BASE_DELAY + 1400} animation="zoom">
                <div className="bg-gradient-to-r from-[#6B46C1] to-[#553C9A] text-white p-3 rounded-lg shadow-md mt-2 border border-[#D4AF37]">
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <CrownIcon className="w-4 h-4 text-[#FFD700]" />
                    <p className="font-['Cinzel'] text-xs font-bold tracking-wider uppercase text-[#E8B4D9]">Entrada Triunfal</p>
                    <CrownIcon className="w-4 h-4 text-[#FFD700]" />
                  </div>
                  <p className="text-3xl font-['Great_Vibes'] text-[#FFD700] text-glow-gold">8:30 PM</p>
                </div>
              </AnimatedElement>
            </div>
            
            <AnimatedElement isActive={isActive} delay={BASE_DELAY + 1800} className="mt-auto w-full">
              <Placeholder label="Ambiente Mágico" seed={555} className="h-28 w-full rounded-lg border border-[#D4AF37]" />
            </AnimatedElement>
          </div>
        </div>
      );

    case 'location':
      return (
        <div className={paperStyle}>
          {vignette}
          <DecorativeBorder />
          <div className="z-10 flex flex-col h-full items-center pt-8">
             <AnimatedElement isActive={isActive} delay={BASE_DELAY + 300} animation="zoom">
               <div className="flex flex-col items-center">
                  <CastleIcon className="w-12 h-12 text-[#6B46C1] mb-2 drop-shadow-md" />
                  <h2 className="font-['Cinzel_Decorative'] text-xl text-[#6B46C1] font-bold text-shadow-sm">El Castillo Real</h2>
                  <RoyalDivider className="w-32"/>
               </div>
             </AnimatedElement>

             <AnimatedElement isActive={isActive} delay={BASE_DELAY + 700} className="w-full px-2">
               <Placeholder label="Mapa del Lugar" seed={99} className="w-full h-48 rounded-lg border-2 border-[#D4AF37] shadow-md mb-6" />
             </AnimatedElement>

             <AnimatedElement isActive={isActive} delay={BASE_DELAY + 1100} animation="slide">
               <div className="text-center space-y-3 bg-white/60 p-4 rounded-xl border border-[#E8B4D9] backdrop-blur-sm">
                 <div>
                    <h3 className="font-['Cinzel_Decorative'] font-bold text-lg text-[#2D3748] flex items-center justify-center gap-2">
                        Restaurante Antojitos
                    </h3>
                 </div>
                 <div className="flex items-center justify-center gap-2 text-[#44337A]">
                    <MapPinIcon className="w-5 h-5 text-[#D4AF37]" />
                    <p className="font-['Playfair_Display'] font-semibold text-lg">Panamericana 5½</p>
                 </div>
                 <div className="bg-[#FFF8E7] p-2 rounded border border-dashed border-[#D4AF37]">
                    <p className="text-[10px] text-gray-600 italic font-serif">
                    Ref: Media cuadra del Colegio María Parado de Bellido, San Clemente
                    </p>
                 </div>
               </div>
             </AnimatedElement>
          </div>
        </div>
      );
      
    case 'dresscode':
      return (
        <div className={paperStyle}>
          {vignette}
          <DecorativeBorder />
          <div className="z-10 flex flex-col h-full items-center justify-between text-center pt-8 pb-12">
             <div className="flex flex-col items-center w-full">
                 <AnimatedElement isActive={isActive} delay={BASE_DELAY + 200}>
                    <h2 className="font-['Cinzel_Decorative'] text-3xl text-[#6B46C1] mb-2 drop-shadow-sm text-shadow-sm">Vestimenta</h2>
                    <p className="font-['Cinzel'] text-xs text-[#D4AF37] uppercase tracking-[0.3em] font-bold mb-6">Código Real</p>
                 </AnimatedElement>

                 <AnimatedElement isActive={isActive} delay={BASE_DELAY + 600} animation="zoom">
                   <div className="relative mb-6">
                     <div className="absolute inset-0 bg-[#F5C6E8] blur-xl opacity-50 rounded-full"></div>
                     <div className="relative w-32 h-32 rounded-full border-4 border-double border-[#D4AF37] bg-gradient-to-b from-white to-[#F5C6E8] flex items-center justify-center shadow-lg">
                       <DressIcon className="w-16 h-16 text-[#6B46C1]" />
                     </div>
                   </div>
                 </AnimatedElement>

                 <AnimatedElement isActive={isActive} delay={BASE_DELAY + 1000} animation="slide">
                   <div className="bg-white/80 px-6 py-3 rounded-full border border-[#D4AF37] shadow-sm mb-8 backdrop-blur-sm">
                     <p className="font-['Playfair_Display'] text-xl font-bold text-[#2D3748]">✨ Sport Elegante</p>
                   </div>
                 </AnimatedElement>
             </div>

             <AnimatedElement isActive={isActive} delay={BASE_DELAY + 1600} animation="bounce" className="w-full flex justify-center">
               <div className="w-64 bg-white border-2 border-[#D4AF37] p-4 rounded-lg shadow-lg relative overflow-hidden mx-auto">
                 <div className="absolute top-0 left-0 w-full h-1 bg-[#D4AF37]"></div>
                 <div className="flex items-center justify-center gap-2 mb-2">
                    <div className="h-px w-4 bg-gray-300"></div>
                    <p className="text-[10px] font-bold text-red-400 uppercase tracking-widest font-['Cinzel']">Importante</p>
                    <div className="h-px w-4 bg-gray-300"></div>
                 </div>
                 
                 <p className="font-['Cinzel_Decorative'] font-bold text-2xl text-[#9F7AEA] animate-pulse drop-shadow-sm mb-1">
                   💜 COLOR LILA 💜
                 </p>
                 <p className="text-[11px] text-gray-600 italic bg-gray-50 py-1 px-2 rounded font-serif">
                   Reservado exclusivamente para la quinceañera
                 </p>
               </div>
             </AnimatedElement>
          </div>
        </div>
      );

    case 'parents':
      return (
        <div className={paperStyle}>
           {vignette}
           <DecorativeBorder />
           <div className="z-10 flex flex-col h-full items-center justify-center text-center space-y-4">
              <AnimatedElement isActive={isActive} delay={BASE_DELAY + 200} animation="fade">
                <div className="flex flex-col items-center">
                    <HeartIcon className="w-8 h-8 text-[#D4AF37] mb-2" />
                    <h3 className="font-['Cinzel_Decorative'] text-sm text-[#6B46C1] tracking-widest uppercase font-bold">Con el Honor de mis Padres</h3>
                    <RoyalDivider />
                </div>
              </AnimatedElement>

              <AnimatedElement isActive={isActive} delay={BASE_DELAY + 600} animation="zoom">
                <div className="relative group">
                  <div className="absolute -inset-2 bg-[#D4AF37] rounded-full opacity-20 group-hover:scale-105 transition-transform"></div>
                  <Placeholder label="Padres" seed={202} className="w-48 h-56 rounded-[50%] border-[3px] border-[#D4AF37] shadow-xl" />
                </div>
              </AnimatedElement>

              <div className="space-y-3 mt-2 w-full px-4">
                <AnimatedElement isActive={isActive} delay={BASE_DELAY + 1000} animation="slide">
                  <div className="bg-white/40 p-2 rounded-lg border-b border-[#E8B4D9]">
                    <p className="font-['Playfair_Display'] text-xl text-[#2D3748] font-bold">Rubén Reyes Carreño</p>
                  </div>
                </AnimatedElement>
                
                <AnimatedElement isActive={isActive} delay={BASE_DELAY + 1200} animation="zoom">
                   <span className="font-['Great_Vibes'] text-3xl text-[#D4AF37] text-glow-gold">&</span>
                </AnimatedElement>
                
                <AnimatedElement isActive={isActive} delay={BASE_DELAY + 1400} animation="slide">
                   <div className="bg-white/40 p-2 rounded-lg border-b border-[#E8B4D9]">
                    <p className="font-['Playfair_Display'] text-xl text-[#2D3748] font-bold">Sandra Morell Bravo</p>
                   </div>
                </AnimatedElement>
              </div>
           </div>
        </div>
      );

    case 'godparents':
      return (
        <div className={paperStyle}>
           {vignette}
           <DecorativeBorder />
           <div className="z-10 flex flex-col h-full items-center justify-center text-center space-y-4 pt-6">
              <AnimatedElement isActive={isActive} delay={BASE_DELAY + 200} animation="fade">
                 <div className="flex flex-col items-center">
                    <div className="flex gap-2 mb-1">
                        <CrownIcon className="w-5 h-5 text-[#D4AF37]" />
                        <CrownIcon className="w-5 h-5 text-[#D4AF37]" />
                    </div>
                    <h3 className="font-['Cinzel_Decorative'] text-sm text-[#6B46C1] tracking-widest uppercase font-bold">Mis Padrinos</h3>
                    <RoyalDivider />
                </div>
              </AnimatedElement>

              <AnimatedElement isActive={isActive} delay={BASE_DELAY + 700} animation="zoom">
                 <div className="flex gap-3 w-full px-2 justify-center">
                    <div className="flex-1 max-w-[140px]">
                         <Placeholder label="Madrina" seed={301} className="h-32 rounded-lg border-2 border-[#E8B4D9] shadow-md" />
                    </div>
                    <div className="flex-1 max-w-[140px]">
                        <Placeholder label="Padrino" seed={302} className="h-32 rounded-lg border-2 border-[#E8B4D9] shadow-md" />
                    </div>
                 </div>
              </AnimatedElement>

              <div className="space-y-4 mt-2 bg-white/60 p-5 rounded-xl w-full shadow-sm border border-[#F5C6E8] backdrop-blur-sm">
                <AnimatedElement isActive={isActive} delay={BASE_DELAY + 1200} animation="slide">
                  <div className="relative">
                    <p className="font-['Playfair_Display'] text-lg text-[#2D3748] font-bold">Ariana Ortiz Morell</p>
                    <p className="font-['Cinzel'] text-[10px] text-gray-500 uppercase tracking-widest mt-1">Madrina</p>
                  </div>
                </AnimatedElement>
                
                <div className="w-full h-px bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent"></div>
                
                <AnimatedElement isActive={isActive} delay={BASE_DELAY + 1600} animation="slide">
                  <div className="relative">
                    <p className="font-['Playfair_Display'] text-lg text-[#2D3748] font-bold">Jhon Rojas Morell</p>
                    <p className="font-['Cinzel'] text-[10px] text-gray-500 uppercase tracking-widest mt-1">Padrino</p>
                  </div>
                </AnimatedElement>
              </div>
           </div>
        </div>
      );

    case 'rsvp':
      return (
        <div className={paperStyle}>
           {vignette}
           <DecorativeBorder />
           <div className="z-10 flex flex-col h-full items-center justify-between py-8 text-center">
              <AnimatedElement isActive={isActive} delay={BASE_DELAY + 200}>
                <h2 className="font-['Cinzel_Decorative'] text-2xl text-[#6B46C1] drop-shadow-sm leading-tight">Tu presencia es mi regalo</h2>
                <RoyalDivider className="mt-2"/>
              </AnimatedElement>

              <AnimatedElement isActive={isActive} delay={BASE_DELAY + 700} animation="zoom">
                 <div className="relative">
                    <EnvelopeIcon className="absolute -top-6 -right-6 w-12 h-12 text-[#D4AF37] animate-bounce delay-700" />
                    <Placeholder label="Despedida" seed={500} className="w-48 h-48 rounded-full border-[4px] border-double border-[#D4AF37] shadow-xl" />
                 </div>
              </AnimatedElement>

              <AnimatedElement isActive={isActive} delay={BASE_DELAY + 1200} animation="slide">
                <div className="px-6 relative">
                    <ButterflyIcon className="w-6 h-6 text-[#F5C6E8] absolute -left-2 top-0 rotate-[-15deg]" />
                    <p className="font-['Playfair_Display'] italic text-gray-700 text-lg leading-relaxed font-medium">
                    "Porque los mejores cuentos se escriben con las personas que amamos..."
                    </p>
                    <ButterflyIcon className="w-6 h-6 text-[#F5C6E8] absolute -right-2 bottom-0 rotate-[15deg]" />
                </div>
              </AnimatedElement>

              <AnimatedElement isActive={isActive} delay={BASE_DELAY + 1800} animation="bounce" className="w-full px-6">
                <button className="w-full bg-[#25D366] text-white font-bold py-4 px-8 rounded-xl shadow-lg hover:scale-105 transition-transform flex items-center justify-center gap-3 border-2 border-white ring-2 ring-[#25D366]/50">
                  <WhatsAppIcon className="w-6 h-6" />
                  <span className="font-['Cinzel'] tracking-wide uppercase text-sm font-bold">Confirmar Asistencia</span>
                </button>
              </AnimatedElement>
           </div>
        </div>
      );

    case 'back':
      return (
        <div className="relative w-full h-full bg-[#553C9A] p-1 flex flex-col items-center justify-center border-r-4 border-[#2D3748] shadow-2xl overflow-hidden">
          {/* Texture Overlay */}
          <div className="absolute inset-0 opacity-30 bg-[url('https://www.transparenttextures.com/patterns/purty-wood.png')] mix-blend-multiply"></div>
          
          {/* Ornate Frame */}
           <div className="absolute inset-4 border-[6px] border-[#D4AF37] rounded-lg flex items-center justify-center shadow-[inset_0_0_20px_rgba(0,0,0,0.5)]">
             <div className="absolute inset-1 border border-[#D4AF37] opacity-50 rounded sm-border-dotted"></div>
          </div>

          <div className="z-10 text-center p-6 bg-[#2D3748]/30 backdrop-blur-sm rounded-xl m-6 border border-[#FFFFFF]/10">
             <AnimatedElement isActive={isActive} delay={BASE_DELAY + 300} animation="fade">
                <CrownIcon className="w-12 h-12 text-[#FFD700] mx-auto mb-4 opacity-80 drop-shadow-[0_0_10px_rgba(255,215,0,0.5)]" />
                <p className="font-['Great_Vibes'] text-4xl text-[#FFD700] mb-4 drop-shadow-md text-glow-gold">
                  "Y colorín colorado..."
                </p>
             </AnimatedElement>
             <AnimatedElement isActive={isActive} delay={BASE_DELAY + 1300} animation="slide">
                <p className="font-['Cinzel_Decorative'] text-sm text-white/90 tracking-wider font-bold">
                  ESTA FIESTA AÚN NO HA COMENZADO
                </p>
             </AnimatedElement>
             
             <div className="mt-8 pt-4 border-t border-white/20">
                <p className="text-[#E8B4D9] text-xs font-mono tracking-[0.2em]">
                #Saomi15Años
                </p>
             </div>
          </div>
          
          <div className="absolute bottom-8 text-[10px] text-white/20 font-sans">
            Designed with Magic
          </div>
        </div>
      );

    default:
      return <div>Contenido no encontrado</div>;
  }
};