import { Drawer, Plyr } from "@/common/components";
import { Gallery } from "./gallery";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  EffectCoverflow,
} from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";
import DocViewer, { DocViewerRenderers } from "react-doc-viewer";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

// import required modules

const videoOptions = {
  options: {
    controls: [
      "rewind",
      "play",
      "fast-forward",
      "progress",
      "current-time",
      "duration",
      "mute",
      "volume",
      "settings",
      "fullscreen",
    ],
    i18n: {
      restart: "Restart",
      rewind: "Rewind {seektime}s",
      play: "Play",
      pause: "Pause",
      fastForward: "Forward {seektime}s",
      seek: "Seek",
      seekLabel: "{currentTime} of {duration}",
      played: "Played",
      buffered: "Buffered",
      currentTime: "Current time",
      duration: "Duration",
      volume: "Volume",
      mute: "Mute",
      unmute: "Unmute",
      enableCaptions: "Enable captions",
      disableCaptions: "Disable captions",
      download: "Download",
      enterFullscreen: "Enter fullscreen",
      exitFullscreen: "Exit fullscreen",
      frameTitle: "Player for {title}",
      captions: "Captions",
      settings: "Settings",
      menuBack: "Go back to previous menu",
      speed: "Speed",
      normal: "Normal",
      quality: "Quality",
      loop: "Loop",
    },
  },
  sources: {
    type: "video",
    sources: [
      {
        src: "https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-1080p.mp4",
        type: "video/mp4",
        size: 720,
      },
    ],
  },
};

function TicketDetails(props: {
  ticket: {
    title: string;
    description: string;
    tags: string[];
    id: string;
    status: string;
    priority: string;
    category: string;
    createdAt: string;
    updatedAt: string;
  };
  open: any;
  onClose: () => void;
}) {
  console.log(props.ticket);
  return (
    <Drawer
      open={props.open}
      onClose={props.onClose}
      direction="bottom"
      size={"100vh"}
    >
      <p className="bg-zinc-100 flex flex-col rounded-t-[10px] h-[96%] mt-24 fixed bottom-0 left-0 right-0 overflow-auto pb-16">
        <div className="p-4 bg-white rounded-t-[10px] flex-1">
          <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-zinc-300 mb-8 max-h-screen" />
          <div className="max-w-3xl mx-auto ">
            <h1 className="font-bold mb-4 text-5xl ml-[-10px]">
              Website Payment Bug
            </h1>
            <div className="flex gap-4">
              <span className="bg-[#ffa500ff] text-white text-sm px-4 py-2 rounded-3xl">
                Ticket Bug Report
              </span>
              <span className="bg-[#ff7f7f] text-white text-sm px-4 py-2 rounded-3xl">
                URGENT
              </span>
              <span className="bg-[#00ff00ff] text-white text-sm px-4 py-2 rounded-3xl">
                OPENED
              </span>
            </div>

            <h2 className="font-bold mb-4 text-2xl mt-4">Details</h2>
            <p className="text-zinc-600 mb-2">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Voluptates facere laudantium nostrum ipsam sint numquam,
              reiciendis magni illo, quae minus nihil porro similique nemo iste
              esse officiis illum velit accusamus! Reprehenderit odit autem
              cupiditate officia ea, recusandae amet tempore animi ducimus eos
              voluptates officiis quo! Eum dicta eos fuga quidem enim velit
              molestias, possimus voluptate porro et hic labore dignissimos.
              Velit, iure, dolore ex id nulla commodi praesentium soluta totam
              delectus, rem natus dicta dolorem sed accusamus at molestias
              excepturi deserunt tempora repudiandae ut quibusdam nobis
              perferendis! Ea, sapiente? Ut. Voluptatibus beatae dolorem dolor
              nulla distinctio! Distinctio assumenda doloremque vel consectetur
              accusantium porro, non dolores ex facere, repellat eius amet qui
              beatae quas ratione? Molestias fugiat cumque veritatis sunt
              dolore. Dolorum fuga sint, ipsa nesciunt quod at nobis. Assumenda
              suscipit debitis dolor at placeat corrupti molestiae tempore
              sapiente similique officiis? Inventore harum earum doloribus
              laboriosam odio animi aperiam ullam rerum? Adipisci alias corporis
              culpa dolor beatae? Quis accusantium, iure assumenda minus ea fuga
              dignissimos corrupti soluta reprehenderit maiores! Autem possimus
              fugiat ratione nulla obcaecati. Rem sint cupiditate iure aliquid
              est? Consectetur, consequuntur ratione corporis possimus ab
              voluptates eligendi reprehenderit non placeat quas ipsum officiis
              quo quidem, error repudiandae veniam asperiores itaque nobis est
              deserunt alias inventore quaerat sunt. Natus, quod? Nobis repellat
              accusantium excepturi sapiente quaerat voluptatem. Maiores rem
              rerum nulla excepturi quisquam ut, non sit quis illo dolorum totam
              adipisci magnam possimus nemo? Ratione voluptate natus magni
              laborum explicabo. Iusto, accusantium nesciunt? Explicabo aut
              tempora iusto officiis quaerat eaque porro debitis, rem
              praesentium quae, laborum itaque sint aspernatur. Ab eveniet
            </p>
            {/* <DocViewer pluginRenderers={DocViewerRenderers} documents={docs} /> */}
            <Swiper
              effect={"coverflow"}
              grabCursor={true}
              centeredSlides={true}
              slidesPerView={"auto"}
              coverflowEffect={{
                rotate: 50,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows: true,
              }}
              pagination={true}
              modules={[EffectCoverflow, Pagination]}
              className="z-0"
            >
              <SwiperSlide>
                <img src="https://swiperjs.com/demos/images/nature-1.jpg" />
              </SwiperSlide>
              <SwiperSlide>
                <img src="https://swiperjs.com/demos/images/nature-2.jpg" />
              </SwiperSlide>
              <SwiperSlide>
                <img src="https://swiperjs.com/demos/images/nature-3.jpg" />
              </SwiperSlide>
              <SwiperSlide>
                <img src="https://swiperjs.com/demos/images/nature-4.jpg" />
              </SwiperSlide>
              <SwiperSlide>
                <img src="https://swiperjs.com/demos/images/nature-5.jpg" />
              </SwiperSlide>
              <SwiperSlide>
                <img src="https://swiperjs.com/demos/images/nature-6.jpg" />
              </SwiperSlide>
              <SwiperSlide>
                <img src="https://swiperjs.com/demos/images/nature-7.jpg" />
              </SwiperSlide>
              <SwiperSlide>
                <img src="https://swiperjs.com/demos/images/nature-8.jpg" />
              </SwiperSlide>
              <SwiperSlide>
                <img src="https://swiperjs.com/demos/images/nature-9.jpg" />
              </SwiperSlide>
            </Swiper>
            <br />
            <Plyr
              source={videoOptions.sources}
              options={videoOptions.options}
            />
            <div className="flex gap-5 mt-5 font-bold ">
              <span className="bg-[#3f47a7] text-white text-sm px-4 py-2 rounded-3xl cursor-pointer">
                #Platform
              </span>
              <span className="bg-[#3f47a7] text-white text-sm px-4 py-2 rounded-3xl cursor-pointer">
                #Payment
              </span>
              <span className="bg-[#3f47a7] text-white text-sm px-4 py-2 rounded-3xl cursor-pointer">
                #Bug
              </span>
              <span className="bg-[#3f47a7] text-white text-sm px-4 py-2 rounded-3xl cursor-pointer">
                #Security
              </span>
              <span className="bg-[#3f47a7] text-white text-sm px-4 py-2 rounded-3xl cursor-pointer">
                #Customer
              </span>
            </div>
          </div>
        </div>
        <button
          onClick={props.onClose}
          className="bg-zinc-100 text-zinc-600 font-bold text-2xl py-4 rounded-b-[10px] fixed bottom-0 left-0 w-screen z-10"
        >
          Close
        </button>
      </p>
    </Drawer>
  );
}

export { TicketDetails };
