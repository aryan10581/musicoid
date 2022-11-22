import { Box, Flex, Grid, Img, Text } from '@chakra-ui/react'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useState, useEffect } from 'react'
// import Clock from "../public/clock.png"
export default function Home({ song }) {
  console.log('song', song.songs)
  // let audio_ele= document.querySelectorAll("audio")
  const [index, setindex] = useState(0)
  const [currentaudio, setcurrentaudio] = useState(null)
  const random = () => {
    let a = Math.random() * 71
    a = Math.floor(a)
    setindex(a)
  }
  const play_next = () => {
    random()
    setcurrentaudio(song.songs[index].audio)
    setTimeout(() => {
      document.getElementById("audio_main").play()
    }, 10);
  }

  //  let shuffled = song.songs 
  //     .map(value => ({ value, sort: Math.random() }))
  //     .sort((a, b) => a.sort - b.sort)
  //     .map(({ value }) => value)
  // console.log(shuffled)
  return (
    <Grid minH={"100vh"} overflow={"hidden"} w={"100vw"}>
      <Flex>
        <Grid w={"22vw"} bg={"#001A18"}>
          <Box pl={"2.222vw"} mt={"1.5vh"}>
            <Box h={"20vh"}>

              <Text background={"linear-gradient(180deg, #00ff00, #008000);"} bgClip={"text"} h={"5vh"} className={"russo"} fontSize={"2.222vw"}>
                Musicoid
              </Text>
              <Text color={"white"} mt={"5vh"} fontSize={"1.458vw"} className={"russo"}>
                Good Morning
              </Text>
            </Box>
            <Grid >

              <Text color={"white"} fontSize={"1.11vw"} fontFamily={"roboto"}>
                Your Playlists
              </Text>
            </Grid>

          </Box>
        </Grid>
        <Grid w={"78vw"} placeContent={'center'} bg={"linear-gradient(180deg, #00b6c1, black)"}>
          <Flex ml={"5vw"} mt={"10vh"} justifyContent={"left"} alignItems={"baseline"}>
            <Img src='https://images.unsplash.com/photo-1536599018102-9f803c140fc1?auto=format&fit=crop&w=440&h=220&q=60' w={"13.6vw"} h={"19.14vh"} borderRadius={"0.5vw"} />
            <Text p={"2vw"} className='russo' color={"white"} fontSize={"3.5vw"}>2010s Best</Text>
          </Flex>


          {/* HEAD */}
          <Flex w={"70vw"} justifyContent={"space-between"} color={"white"}>
            <Flex >
              <Text>#</Text>
              <Text ml={"2vw"}>TITLE</Text>
            </Flex>
            <Img src={"/clock.svg"} w={"1vw"} color={"white"} filter={"invert(1)"} />

          </Flex>
          {/* LINE SEPERATOR */}
          <Grid h={".1vh"} mt={"1vh"} w={"70vw"} bg={"#366D71"}>
          </Grid>
          {/* CONTENT1 */}
          <Grid pb={"10vw"} h={"60vh"} overflowY={"scroll"} w={"72vw"} >
            {song.songs.map((e) => {
              return (
                <Flex key={e.id} onClick={() => [document.getElementById("audio_main").pause(), setcurrentaudio(e.audio), setTimeout(() => {
                  document.getElementById("audio_main").play()
                }, 100)]} pt={"1vw"} w={"70vw"} justifyContent={"space-between"} alignItems={"center"} color={"#ffffffeb"}>
                  <Flex alignItems={"center"}>

                    <Text color={"#ffffffd6"}>{e.id}</Text>
                    <Flex justifyContent={"space-between"} w={"65vw"} ml={"2vw"}>
                      <Flex>

                        <Img src={e.img} w={"3vw"} h={"4.21vh"} borderRadius={".25vw"} filter={"invert(1)"} />
                        <Grid ml={"1vw"} >
                          <Text color={"#ffffffd6"} fontSize={"1vw"} fontFamily={"roboto"} >{e.song}</Text>
                          <Text fontSize={"0.9vw"} color={"#ffffff70"} fontFamily={"roboto"}>{e.author}</Text>
                        </Grid>
                      </Flex>
                      <audio audio src={e.audio}  ></audio>
                    </Flex>
                  </Flex>
                  <Text>{e.duration}</Text>
                </Flex>
              )
            })}
            {/* <Flex  pt={"1vw"} w={"70vw"} justifyContent={"space-between"} alignItems={"center"} color={"#ffffffeb"}>
              <Flex alignItems={"center"}>

                <Text color={"#ffffffd6"}>{song.songs.id}</Text>
                <Flex ml={"2vw"}>
                  <Img src={song.songs.img} w={"3vw"} h={"4.21vh"} borderRadius={".25vw"} filter={"invert(1)"} />
                  <Grid ml={"1vw"} >
                    <Text color={"#ffffffd6"} fontSize={"1vw"} fontFamily={"roboto"} >{song.songs.song}</Text>
                    <Text fontSize={"0.9vw"} color={"#ffffff70"} fontFamily={"roboto"}>{song.songs.author}</Text>
                  </Grid>
                </Flex>
              </Flex>
             <audio src={song.songs.audio} controls ></audio>
              <Text>{song.songs.duration}</Text>
            </Flex> */}

          </Grid>

        </Grid>

      </Flex>
      <Grid position={"fixed"} bottom={"1vh"} >
        <audio src={currentaudio} onEnded={play_next} id={"audio_main"} controlsList={"nodownload"} controls></audio>
      </Grid>
    </Grid>
  )

}

export async function getServerSideProps() {
  const res = await fetch("http://localhost:3000/api/hello")
  const data = await res.json()
  return {
    props: {
      song: data
    }
  }
}