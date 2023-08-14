import Image from 'next/image'

export default function Home() {
  return (
    <>
      <div className="max-w-7xl mx-auto px-6 text-white text-xl font-bold py-6 ">world genie</div>
      <div className=''>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between gap-8 flex-col-reverse lg:flex-row">
          <div>
            <h1 className="text-5xl max-w-2xl font-bold text-white">Build worlds worth exploring</h1>
            <br />
            <p className='text-white  max-w-xl opacity-30'>Using WorldGenie, anyone can create beautiful landscapes for their games. Easily export to your three.js based game or any major game engine.</p>
            <br />
            <br />
            <a href="mailto:nwpointer@gmail.com?subject=World genie early access">
              <div className="inline-block cursor-pointer bg-white bg-opacity-10 hover:bg-opacity-20 px-6 py-3 rounded-lg text-white">
                Get early access
              </div>
            </a>
          </div>
          <img className="max-w-md w-full lg:m-8 lg:mr-0 float-right rounded-2xl lg:block hidden" src="/scene_sq.png" alt="" />
          <img className="max-w-mdlg:m-8 lg:mr-0 lg:float-right rounded-2xl block lg:hidden" src="/scene_wd.png" alt="" />

        </div>
        <br /><br /><br /><br />
        <div className="max-w-7xl mx-auto px-6 flex">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-8 gap-8 border border-white border-opacity-[8%] rounded-xl">
            <div>
              <div className="text-white pb-2">Easy to use</div>
              <p className='text-white  text-sm max-w-2xl opacity-30'>
                Skip the learning curve of apps like blender or photoshop, use a tool optimzed for world building and get results quicker
              </p>
            </div>
            <div>
              <div className="text-white pb-2">Proc Generation</div>
              <p className='text-white  text-sm max-w-2xl opacity-30'>
                Simple procedural tools like erosion filters bring realistic details in seconds
              </p>
            </div>
            <div>
              <div className="text-white pb-2">Easy export & sync</div>
              <p className='text-white  text-sm max-w-2xl opacity-30'>
                One click export into three.js game projects. Hot realoding lets you view your terrain in your project in realtime
              </p>
            </div>
            <div>
              <div className="text-white pb-2">
                Broswer Based
              </div>
              <p className='text-white  text-sm max-w-2xl opacity-30'>
                No downloads or expensive yearly contracts. also works on touch screens
              </p>
            </div>
            <div>
              <div className="text-white pb-2">
                Infinite worlds on demand
              </div>
              <p className='text-white  text-sm max-w-2xl opacity-30'>
                extend your terrains in any direction in realtime using our on demand terrain generation api
              </p>
            </div>
            <div>
              <div className="text-white pb-2">
                Any style
              </div>
              <p className='text-white  text-sm max-w-2xl opacity-30'>
                works great for low poly, topdown and realistic games
              </p>
            </div>
          </div>
        </div>
        <br /><br /><br /><br />
      </div></>
  )
}
