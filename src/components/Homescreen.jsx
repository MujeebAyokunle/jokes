
import React, { useEffect, useState } from 'react';
import Categories from './categories';
import Footer from './footer';
import './Homescreen.scss'
import Navbar from './Navbar';
import ApiCall from '../apiCall';

const Homescreen = () => {

    const [searchinput, setSearchinput] = useState('')
    const [pagenumber, setPagenumber] = useState(1)
    const [defaultCategory, setDefaultcategory] = useState('Uncategorized')
    const [inputFocus, setInputFocus] = useState(false)
    const [jokes, setJokes] = useState([])
    const [categories, setCategories] = useState([])
    const [searchPagenumber, setSearchPagenumber] = useState(1)
    const [jokeindex, setJokeindex] = useState(0)
    const [joke, setJoke] = useState({})
    const [singleJoke, setSingleJoke] = useState(false)
    const [returnedColor, setReturnedColor] = useState('#57e690')

    useEffect(() => {
        ApiCall("http://localhost:2000/homepage", "POST", { pagenumber: pagenumber, category: 'Uncategorized' }, async (data) => {

            let apiresponse = await data
            setJokes(apiresponse['historylist'][0])
            setCategories(apiresponse['categories'][0])
        })
    }, [pagenumber,])

    const viewMore = () => {
        let page = pagenumber + 1
        setPagenumber(page)
        ApiCall("http://localhost:2000/homepage", "POST", { pagenumber: page, category: defaultCategory }, async (data) => {

            let apiresponse = await data
            setJokes(apiresponse['historylist'][0])
        })
    }

    const searchText = (text) => {
        setSingleJoke(false)
        ApiCall("http://localhost:2000/joke/search", "POST", { pagenumber: searchPagenumber, searchtext: `%${text}%` }, async (data) => {
            let apiresponse = await data
            setJokes(apiresponse['historylist'][0])
        })
    }

    const seeMore = (data, id) => {
        setJoke(data)
        setSingleJoke(true)
        setJokeindex(id)
    }

    const like = () => {
        ApiCall("http://localhost:2000/alterlike", "POST", { pagenumber: pagenumber, id: joke.id, task: 'like' }, async (data) => {
            let apiresponse = await data
            setJokes(apiresponse['defaultList'][0])
            setJoke(apiresponse['selectedJoke'][0][0])

        })
    }

    const dislike = () => {
        ApiCall("http://localhost:2000/alterlike", "POST", { pagenumber: pagenumber, id: joke.id, task: 'dislike' }, async (data) => {
            let apiresponse = await data
            setJokes(apiresponse['defaultList'][0])
            setJoke(apiresponse['selectedJoke'][0][0])
        })
    }

    const next = () => {
        let nextIndex = jokeindex + 1
        let max = jokes.length - 1

        if (nextIndex > max) {
            nextIndex = max

        }
        setJokeindex(nextIndex)
        setJoke(jokes[nextIndex])
    }

    const prev = () => {
        let prevIndex = jokeindex - 1

        if (prevIndex < 0) {
            prevIndex = 0
        }
        setJokeindex(prevIndex)
        setJoke(jokes[prevIndex])
    }

    const categorize = (category, color) => {
        setPagenumber(1)
        setReturnedColor(color)
        setDefaultcategory(category)

        if (category == '') {
            setDefaultcategory("view all")
        }

        ApiCall("http://localhost:2000/homepage", "POST", { pagenumber: pagenumber, category }, async (data) => {
            let apiresponse = await data
            setJokes(apiresponse['historylist'][0])
            setCategories(apiresponse['categories'][0])
        })
    }

    return (

        <div className='body-section' >

            <Navbar />
            <div className='nav' >
                <h1 className='jokebible'>The Joke Bible</h1>
                <h2 className='jokebibleSubtext'>Daily Laughs for you and yours</h2>
                {
                    !inputFocus && searchinput == '' ? (
                        <div className='inputDiv' >
                            <input
                                onMouseDown={() => {
                                    setInputFocus(true)
                                }}
                                onBlur={() => setInputFocus(false)}
                                placeholder='How can we make you laugh today?' type='text' />
                            <img src={require("../assets/assets_Homework_Front-End_01/search-copy.png")} style={{ cursor: 'pointer' }} alt='search' />
                        </div>
                    ) : (
                        <div style={{ position: 'relative' }} >
                            <div className='inputDiv2' >
                                <input value={searchinput}
                                    id="myText"
                                    onMouseDown={() => setInputFocus(true)}
                                    onBlur={() => setInputFocus(false)}
                                    onChange={(txt) => {
                                        setSearchinput(txt.target.value)
                                        searchText(txt.target.value)
                                    }} placeholder='How can we make you laugh today?' type='text' />
                                <img style={{ cursor: 'pointer' }} src={require("../assets/assets_Homework_Front-End_02/search-copy.png")} alt='search' />
                            </div>

                            <div className='search-dropdown-content' >
                                <a href='#' > <span> <img alt='dad_jokes' src={require('../assets/assets_Homework_Front-End_02/blue-light.png')} /> </span> &nbsp; Social Jokes: The Crazy Teacher </a>
                                <a href='#' > <span> <img alt='dad_jokes' src={require('../assets/assets_Homework_Front-End_02/green-light.png')} /> </span> &nbsp; Job Jokes: First day of class </a>
                                <a href='#' > <span> <img alt='dad_jokes' src={require('../assets/assets_Homework_Front-End_02/green-light.png')} /> </span> &nbsp; Job Jokes: Sleepy Professor </a>
                                <a href='#' > <span> <img alt='dad_jokes' src={require('../assets/assets_Homework_Front-End_02/red-light.png')} /> </span> &nbsp; Dad Jokes: Can you spell that? </a>
                            </div>
                        </div>
                    )
                }
            </div>
            {
                !singleJoke ? (
                    <div>
                        {/* Categories */}
                        <Categories categoryfunc={categorize} categories={categories} />

                        <div style={{ display: 'flex', marginTop: '30px' }} >
                            <p className='category-badge' style={{ backgroundColor: returnedColor }} > {defaultCategory.toUpperCase()} </p>
                        </div>
                        <div className='search-list' >
                            {
                                jokes.map((joke, index) => (
                                    <div onClick={() => seeMore(joke, index)} className='list-container' >
                                        <div className='list-subheader' >
                                            <p>LAWYER JOKE</p>
                                        </div>
                                        <div className='list-content'>
                                            <p> {joke.joke} </p>
                                        </div>
                                        <div className='list-footer' >
                                            <div className='sub-footer' >
                                                <p> SEE STATS </p>
                                                <p> <img alt='' src={require('../assets/assets_Homework_Front-End_01/path-copy.png')} /> </p>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>

                        <div style={{ textAlign: 'center', paddingBottom: 30 }} >
                            <div onClick={viewMore} className='category-button view-more' >
                                <p > VIEW MORE
                                    <span style={{ float: 'right' }} > <img alt='' src={require('../assets/assets_Homework_Front-End_01/path-copy-7.png')} /> </span>
                                </p>
                            </div>
                        </div>

                    </div>
                ) : (
                    <div >
                        <div className='single-container' >
                            <div
                                onClick={() => {
                                    setSingleJoke(false)
                                    setJoke([])
                                }}
                                className='back-button' >
                                <img src={require('../assets/assets_Homework_Front-End_02/arrow-left.png')} width={20} style={{ height: 20 }} alt="" />
                            </div>
                        </div>
                        <div className='single-list' >
                            <div className='singlejoke' >
                                <div className='single-list-container' >
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }} >
                                        <p className='category-badge2' > {joke.categories.toUpperCase()} </p>
                                        {
                                            joke.likes < 51 && (
                                                <p className='trending' > .TRENDING </p>
                                            )
                                        }
                                        {
                                            (joke.likes > 50 && joke.likes < 101) && (
                                                <p className='popular' > .POPULAR </p>
                                            )
                                        }
                                        {
                                            (joke.likes > 100) && (
                                                <p className='epic' > .EPIC </p>
                                            )
                                        }

                                    </div>
                                    <div className='single-header-container' >
                                        {/* className='list-subheader' */}
                                        <p > {`${joke.categories} Joke`} &nbsp;
                                        </p>
                                        <p > </p>
                                        <div style={{ position: 'relative', width: 60 }}>
                                            <p className='ranking'> NO #1 </p>
                                        </div>

                                    </div>
                                    <div className='single-joke' >
                                        {/* className='list-content' */}
                                        <p> {joke.joke}
                                        </p>
                                    </div>
                                </div>

                                <div className='single-list-footer' >
                                    <div style={{ display: 'flex', flexDirection: 'row' }} className='' >
                                        <div className='likes-container' >
                                            <div onClick={like} className='likes' >
                                                <img width={'20px'} style={{ height: '20px' }} src={require('../assets/assets_Homework_Front-End_02/hand.png')} alt="" />
                                            </div>
                                            <p className='likes-p'> {joke.likes} </p>
                                        </div>

                                        <div className='likes-container' >
                                            <div onClick={dislike} className='dislikes' >
                                                <img width={'20px'} style={{ height: '20px' }} src={require('../assets/assets_Homework_Front-End_02/hand-copy.png')} alt="" />
                                            </div>
                                            <p className='dislikes-p'> {joke.dislikes} </p>
                                        </div>

                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'row' }} className='' >
                                        <div className='likes-container' >
                                            <div className='nextjoke' >
                                                <p className='next-button-p' onClick={prev} > <img style={{ width: '10px', height: '10px' }} alt="" src={require('../assets/assets_Homework_Front-End_02/arrow-left.png')} /> &nbsp; PREV. JOKE </p>
                                            </div>
                                        </div>

                                        <div className='likes-container' >
                                            <div className='nextjoke' >
                                                <p className='next-button-p' onClick={next}> NEXT JOKE &nbsp; <img alt='' style={{ width: '10px', height: '10px' }} src={require('../assets/assets_Homework_Front-End_02/arrow-left-copy.png')} /> </p>
                                            </div>

                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div className='top-lists' >
                                <p>THE TOP JOKES THIS WEEK</p>
                                <p> Smoking Joke </p>
                                <p>My Boss Joke</p>
                                <p>Dirty Millionaire Joke</p>
                                <p>The annoying neighbor</p>
                                <p>Knock Knock</p>
                                <p>Why Tyson lisps</p>
                                <p>The drunk Police officer</p>
                                <p>My hip dad (Dad joke)</p>
                                <p>What not to say in an elevator</p>
                            </div>

                        </div>
                    </div>
                )
            }
            <Footer />
        </div>
    );
}

export default Homescreen;
