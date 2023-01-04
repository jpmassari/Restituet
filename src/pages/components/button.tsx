type Ready = {
  ready: {
    middle: boolean,
    modern: boolean
  }
}

export const Button = (ready: Ready) => (
  <div className="h-8 w-28 m-auto">
    {ready.ready.middle && ready.ready.modern ? (
      <button
        className="w-full h-full rounded-sm bg-[#6BA87C] shadow hover:bg-[#527F5E] duration-200 ease-in-out text-white"
      >
        Submit
      </button>
    ) : (
      <button
        className="w-full h-full rounded-sm bg-opacity-80 bg-[#DEDEDE] hover:bg-opacity-60 duration-200 ease-in-out  shadow duration-200 ease-in-out text-[#666666]"
        disabled
      >
        Wait
      </button>
    )}
  </div>
)