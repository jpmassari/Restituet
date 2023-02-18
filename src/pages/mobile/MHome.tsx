import { useState, useEffect } from 'react'
import Image from 'next/image'

import { trpc } from "../../utils/trpc";

interface Device {
  device: UAParser.IResult
}

const MHome: React.FC<Device> = ({ device }) => {
  return (
    <section>
      <div>
        
      </div>
    </section>
  )
}

export default MHome