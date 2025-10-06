export default function About() {
  return (
    <div className='w-full min-h-[50vh] bg-gradient-to-b from-slate-800 to-slate-900
    flex flex-col gap-2 p-2'>

      <div className="text-green-100  w-[75%] font-light p-6">
        <h1 className="text-5xl font-semibold mb-4 bg-teal-300/10  font-mono w-fit px-2 text-teal-400">About Me</h1>

        <div className="space-y-3 leading-relaxed">
          <p>
          </p>
          I prefer <span className="underline underline-offset-4 decoration-2 decoration-orange-300">strictly typed</span> languages and code that mixes a bit of <span className="text-amber-300 font-medium">procedural</span>, <span className="text-teal-300 font-medium">object-oriented</span>, and <span className="text-pink-300 font-medium">functional</span> flavor instead of strictly subscribing to one paradigm. Too much abstraction just sucks the fun out of writing code.

          <p>
            These days, I mostly write in <span className="font-semibold
            bg-blue-300/10 text-blue-300 p-0
            " >TypeScript</span> and <span className=" text-green-300 bg-green-300/10 font-semibold">Java</span>, while tinkering with a bit of <span className="font-semibold text-violet-300 bg-violet-300/10">C</span>.
          </p>

          <p>
            I’m currently pursuing a degree in computer science & engineering.
          </p>
        </div>

        <p className="mt-4">Other than that, I also enjoy <span className='font-mono'> math</span>  and <span className='font-mono'>  physics</span>.</p>
      </div>



    </div>
  )
}
