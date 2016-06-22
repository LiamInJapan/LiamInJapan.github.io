---
layout: post
title:  "Minimum Viable Portfolio"
date:   2016-01-06 19:46:08
categories: website
---

The Short Version
-----------------

tldr; I am creating a new data driven portfolio in the vein of an RPG character sheet. 
It can be seen [here][portfolio].

It runs off a parse database and has a simple (command line) interface for updating skills and projects to provide "character development" over time.

This is nowhere near complete. But as they say, if you are not embarrased by your first release, then you've released too late. :)
It is currently only tested in Chrome on Mac OS X. It almost certainly doesn't work on phones yet.

The Long Version: 
-----------------

Hello and welcome to my first proper post of this new blog! Today I will be introducing something I am working on at the moment, a new portfolio. Not just any portfolio, but a data-driven, gamified portfolio in the vein of a RPG character sheet!

There were a number of things I wanted to get out of this experiment:

- Present completed projects and a profile of my skillset in a visual, contextual format:

This is a fairly standard objective of a portfolio.

- Build a portfolio that is self-representative of my skillset:

I could create a much simpler (and probably better looking, at least at first) portfolio using something like Wordpress and a good looking theme. However, doing it in a format that's self illustrative of my skillset (something a standard word document/illustrator resume, or a wordpress blog doesn't do) feels like it has more value. It might take a little more time to develop, but I feel this is more worth it, and with better learning outcomes.

- Learn some new skills

*Skills used: Jekyll, Markdown, Parse, Javascript (underscore.js, paper.js, Parse API), HTML, CSS, Python, Unix CL*

While in theory I know how a web application is put together, I am yet to touch all parts of a whole web application. Truth be told, web development is a massive gaping hole in my knowledge portfolio; other than a couple of simple Wordpress theme blogs I've never put a whole web page together before from scratch. While this project can hardly be described as [full stack][full stack] (I am not touching the operating system level code, and as I am using Parse, I am not thinking too deeply about the Database level), it does represent a fairly comprehensive exercise in developing a full web application.

Luckily it turns out its not that massively different from native mobile application development. :)

- Gamified CPD (Continued Professional Development)
As a professional [software engineer][ukspec] and aspiring [Chartered Engineer][ceng wiki] I aim to engage in Continued Professional Development (e.g. to constantly strive to update my knowledge portfolio). As was once said by Mary Poppins *“In every job that must be done, there is an element of fun. You find the fun and 'snap', the job's a game”*; my attempt at finding the game in this is to create a skill sheet that I can level up. If I can be compelled to grind to gain levels in an RPG, perhaps I can use some of these motivational tricks to "grind" at real-life skills.

Potential Uses of a Data-Driven Portfolio
-----------------------------------------

Aside from the obvious use as a portfolio, I believe a system like this, with some further development, has a number of potential uses:

- Personal and Team Development

As mentioned, this software can be used to track personal development, and help get a grasp on an individuals skillset quickly. Goals could be set with this software, and team structure functionality could be implemented. It could be integrated with a companies HR, professional development and goal setting processes to great effect.

- Hiring

Hiring is difficult and expensive. You need to generate a number of appropriate candidates (through advertising, recruiters or personal networks), you need to weed out unsuitable candidates and hone in on the potentially strong ones. Wouldn't it be great if you could generate a data-based profile and ask an API for a set of potential candidates rather than having to go through the traditional recruitment channels? Wouldn't it be great by the simple process of a candidate having set up such a profile that they are exhibiting some base programming knowledge such as the use of a command line tool and interacting with a REST API (arguably indispensable skills to any professional programmer worth his salt)? And finally wouldn't it be great to cut out that inevitable stage in an interview whereby the interviewer goes through the candidates set of skills and previous jobs and tries to understand how each skill was used for each project from the candidate? A system like this could definitely optimise hiring processes.

Limitations
-----------

- Accuracy of initial audit and ongoing data collection/honesty and integrity of data

The results that the system shows are only as honest as the data that is input into the system. This is also true of the traditional resume however, and this format at least provides the ability to do some basic data processessing and sanity checks. 

- Some skills belong in multiple categories. Some skills are arguably just subets of other categories.

This is true. How do I make a a distinction for example between Objective C, UIKit and Interface Builder? Is Jenkins a programming skill, or a project management skill? Is drumming a measurable skill since I've used it in a job? Or is it just a hobby. The simple fact is, for every classification of a skillset, there is an array of opinions on why it could be something different. The point is, I've made a decision to describe it like this, and the data is there to provide information for potential clients and to provide a springboard for discussion.

- A man is not his numbers.

This is also true. Just because someone spends a long time doing something doesn't mean they are neccesarily good at it. I've spent a fair bit of time skateboarding, but it's a skill that seems to defy my best attempts at getting good at it. Some people are just naturally better at one thing than others. Some hours are just better spent with more learning experiences crammed into them than others. Some people are just better at learning or not making the same mistakes as others. But like all data, it is just data, it is up to the viewer to process this into useful information. And no system is going to give the creativity and wisdom needed to make good hiring decisions. But as has been pointed out above, these are problems that are also exhibited by the traditional resume system, at least a data-driven portfolio gives someone better tools than a traditional resume to make good decisions.

- Definitions of individual skills. Or "How do I classify git/svn?"

Some things are just very hard to track time on. Good examples of this are communication and language skills, and source control skills, things that are often passive and always in use. There are definitely source control ninjas out there, and there are those who barely know what a branch is, but I think all would find it difficult to quantify (in time terms at least) how long they've spent using it due to it's constant nature. This isn't an easy to overcome limitation unfortunately


Technical Improvements and Future Features
------------------------------------------

- Visual and Motion Design - This still needs a lot of work to make the interface more obvious and pleasurable to use.
- Canvas Use Reduction - Canvas is used a lot in this project
- Responsive Design Implementation - Currently the interface is designed to my laptops screen, in Chrome. Time needs to be spent to increase its "responsivity" to different screen sizes. I've started some [tests][responsive-test] for this.
- Aesthetics - Very little has been done to the color, graphic design and aesthetics of the page. This needs to be developed more.
- Tech choice - I chose the tech as it was all stuff I wanted to learn. In retrospect, I may not have used Parse if I know what I know now. Rather, one large plain JSON object and some custom overloaded functions to modify it might be a faster, more scalable solution (scalable, in terms of multiple users viewing *my* portfolio at least.)
- Caching - No consideration of caching has been made at all at this point. Thinking about this more could definitely provide some serious optimisation.
- Scalability - No consideration of scalability has been made. Using parse's free package has provided some interesting limitations however, and has made me think about scalability issues with web services and databases more deeply. For example, Parse only allows 30 requests a second; Parse also doesn't have any in-built support for uniqueness. I can program uniqueness myself by using Parse Cloud Code's pre-save hooks to check against values. However, even when saving an array of objects with Parse, the pre-save hook counts as one request per-object, which results in very quickly burning through your free request limit. This provides an interesting limitation to work around and doing this had made me think more about scalability tradeoffs and whether to run code server-side or client-side.
- Mouseovers - I'd like to develop mouseovers and more contextual information for the interface. E.g. **What** skill was used with **which** project and **how**.
- Source Control links - Links to source for different projects would be nice to show code samples to back up the portfolio.
- Refactoring and Optimisation - I am pretty new to javascript, and a lot of the code has been written pretty poorly. I definitely need to brushup on the javascript way of doing things and write things better.
- User accounts and teams and query API - As mentioned above, this could be a useful tool for HR departments and other developers. For it to be more than just a portfolio, an accounts system and a query API would need to be developed to make this a reality.
- Goal Setting - It would be good to mark projects or skills as "focus points" to allow this to also be used for goal setting.
- Adding hooks to other productivity systems (pomodoros, Hansoft, Asana and so on)
- Deep linking to allow the interface to be open in specific state
- Breaking up of the database and environment into development and production

I'll hopefully get through some of this feature list over the coming weeks!

The wonderful illustration in the circle is provided by the equally wonderful [Maa-Kun][maamite-portfolio]! Thanks Maa!

Similar Ideas:
--------------
- [JSON Resume][jsonresume]
- [Geek Resume][geekresume]
- [HR Open Standards][hropenstandards]

[portfolio]: http://liaminjapan.github.io/charSheet.html
[full stack]: http://www.laurencegellert.com/2012/08/what-is-a-full-stack-developer/
[ukspec]: http://www.engc.org.uk/ukspec.aspx
[ceng wiki]: https://en.wikipedia.org/wiki/Chartered_Engineer_(UK)
[jsonresume]: https://jsonresume.org/
[hropenstandards]: http://www.hropenstandards.org/
[geekresume]: http://www.howardism.org/Technical/Other/Geek_Resume.html
[responsive-test]: http://LiamInJapan.github.io/responsiveGrid.html
[maamite-portfolio]: http://maamite.com/


