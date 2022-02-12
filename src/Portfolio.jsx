import React from 'react'
import About from './About'
import Skills from './Skills'
import Projects from './Projects'

function Portfolio() {
  return (
    <main style={{backgroundColor: "black", height: "100%", overflow: "scroll"}}>
        <About />
        <Projects />
        <Skills />
    </main>
  )
}

export default Portfolio