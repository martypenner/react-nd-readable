import React from 'react';
import * as moment from 'moment';
import Flex from 'jsxstyle/Flex';
import Row from 'jsxstyle/Row';
import Col from 'jsxstyle/Col';
import Block from 'jsxstyle/Block';
import ThumbUp from 'react-icons/lib/md/thumb-up';
import ThumbDown from 'react-icons/lib/md/thumb-down';
import * as colors from 'material-ui/styles/colors';
import Markdown from 'react-markdown';
import Comment from './Comment';

const PostDetail = ({ post = postDummy }) => {
  const submittedDate = moment(post.timestamp);

  return (
    <div>
      <Flex style={{ marginBottom: 10 }}>
        <Row flex="1" justifyContent="space-between">
          <Col
            flex="1"
            style={{ minWidth: '4.4rem', marginTop: '0.7rem' }}
            className="mui--text-dark-secondary">
            <ThumbUp
              color={colors.indigo500}
              role="button"
              aria-label="upvote"
              tabIndex="0"
            />
            {/* todo: change look based on up- or down-voted */}
            <span title={post.voteScore}>{post.voteScore}</span>
            <ThumbDown
              color={colors.red500}
              role="button"
              aria-label="downvote"
              tabIndex="0"
            />
          </Col>

          <Col flex="30">
            <div>
              <div className="mui--text-display1" style={{ marginBottom: 5 }}>
                {post.title}
              </div>
              <div className="mui--text-caption mui--text-dark-secondary">
                submitted{' '}
                <time
                  title={submittedDate.toISOString()}
                  dateTime={submittedDate.toISOString()}>
                  {submittedDate.fromNow()}
                </time>{' '}
                by <span className="author">{post.author}</span>
              </div>
            </div>

            <a
              href={`${window.location.href.replace(
                /(.+)#.*/gi,
                '$1'
              )}#comments`}
              rel="nofollow">
              {post.comments.length} comment{post.comments.length === 0 ||
              post.comments.length > 1 ? (
                's'
              ) : (
                ''
              )}
            </a>
          </Col>
        </Row>
      </Flex>

      <Markdown source={post.body} />

      <div>
        <h2 id="comments">Comments</h2>

        {post.comments.map(comment => (
          <Comment comment={comment} key={comment.id} />
        ))}
      </div>
    </div>
  );
};

const postDummy = {
  title: 'This is some interesting street art.',
  author: 'Timigos',
  timestamp: Date.now(),
  voteScore: 17,
  comments: [
    {
      id: Math.random(),
      timestamp: Date.now(),
      author: 'SeattleMana',
      voteScore: 7,
      body:
        'And those places he is going to are not places he is going to just to go to but to keep going to new places. or something like that'
    },
    {
      id: Math.random(),
      timestamp: Date.now(),
      author: 'SeattleMana',
      voteScore: 7,
      body:
        'And those places he is going to are not places he is going to just to go to but to keep going to new places. or something like that'
    }
  ],
  body: `Welcome to my guide for Clicker Heroes. I started this game 3 weeks ago and reached zone 4870 now. In the last 3 weeks i had to google my way through several posts and tips because there is not a comprehensive guide for the actual version of CH. I want to sum up all I learned into a guide, so others may not have to do the same. Please feel free to add any comments or questions.
  I don't want to start off with a lot of term explanation, because this would make the post to big and long and i want to concentrate on tips and tactics. I recommend using wikia to look up the specifics:
  http://clickerheroes.wikia.com/wiki/ClickerHeroes_Wiki
  This guide reflects my experiences, opinions and information from other helpful posts. You don't need to stick to everything as I explain it, and if you find better or easier ways please add this in the comments. Also I played extremely active in the last 3 weeks, so don't be disappointed if you may not reach same levels in the same time, just enjoy the game.
  The first 300 Zones (Basics)

  I just started the game, what do i do first?
  First you want to decide what kind of gameplay you prefer. There are 3 different types how you can play CH in general, following I will explain the differences. Keep in mind, that you can change playstyles later, so your decision is not final.
  Idle Playstyle
  Idle needs the least effort and attention, but for that it progress slower then the others. It depends mostly on the Ancients Libertas and Siyalatas. The Idle bonus only works if you don't click or use a skill for 60 seconds. The idle indicator will appear besides your total dps if you enter idle mode (but only if you have Libertas or Siyalatas already).
  I recommend this style for players, who just want to let CH run in the background and return to it sometimes to upgrade the heroes.
  Active Playstyle
  Active needs a nearly constant attention but in return it's the fastest to progress and run much deeper then the other 2 styles. For active style you want to concentrate on the Ancients Bhaal, Fragsworth and Juggernaut. One warning in advance, if u don't use an Autoclicker, this style gets boring and stressful pretty fast.
  I recommend this style for players who want to progress very fast, especially at the beginning, and have nothing else to do.
  Hybrid Playstyle
  Hybrid is a mixture of Idle and Active. It needs a lot less effort then active style and can progress deeper then idle. You will need to concentrate on all Ancients mentioned in the other two styles. Here a little example how Hybrid would work: Let's say you reached zone 2000. You will start the run in Idle mode for ~1800 levels, then Idle gets very slow or cant progress, this will need probably 1.5 - 2 hours. After that you switch to active and start clicking for around 30-45 minutes to progress 300 - 400 zones deeper. The clear advantage is, that you don't need to pay as much attention as in active but get several of its benefits.
  This is probably the style that is used most, at least by players who progressed very deep. It is my clear favorite and my recommendation for everyone who want to take this game more serious then a side game.
  I'm in my first run, what do I do?
  The very first run will need some time to complete. Depending on how active you play, between 6 hours and a day. You will not have any Ancients to support you yet, so its mostly upgrading the heroes and try to get to zone 100. As you don't have any idle bonuses yet, I recommend active style for the first run, but you can do it idling as well. Keep your buffs for bosses and upgrade all heroes until they got all their skills. Some of the skills are useful for others heroes and your clicking as well.
  As soon as you cleared zone 100 you get your first Hero Soul (HS) and could ascend the first time. I would recommend to try to get to zone 105 or 110 and maybe get lucky with a Primal boss (see wikia for infos on Primals). Before you use the first ascension you want to upgrade all heroes as high as possible. For every 2000 Hero levels you get 1 extra HS after ascension. You should aim for 7-11 HS in your first run. After you finally ascended its time for your first Ancients.
  What Ancients do I get?
  What Ancients you get first depends on your playstyle (see above). If you are playing hybrid, I recommend the active Ancients first, but if you don't want to pay so much attention, you can go with the idle Ancients as well.
  After you get the necessary style-related Ancients you want to push the gold income. For that you use Mammon, Dora and Mimzee. Later you want to add Fortuna as well, but in your first runs the effect isn't very noticeable. Now that we have checked damage and income, we want more HS of course. For that we get us a Solomon. After you reached zone 200 and start using Gilds actively you might want to add Argaiv (see below in Gilds).
  In general
  Idle: Siyalatas > Libertas > Mammon > Dora > Mimzee > Solomon > Fortuna
  Active: Juggernaut > Fragsworth > Bhaal > Mammon > Dora > Mimzee > Solomon > Fortuna
  Some people prefer Solomon before the gold Ancients, but imo its better to have a stable setup to make successful runs first.
  Ok, but what about Morgulis and the rest? Every HS you don't spend gives you a 10% damage bonus. To make that easier they added Morgulis so you can just feed him the HS and get the same boost. In your first runs you don' really need him because you can just hold back and keep HS. But if you have some HS left later you can buy him for easier handling. The rest of the Ancients is not of much use until you transcend the first time imo. The HS income at the moment is just not high enough to get them to effective levels.
  How do i level my Ancients?
  CH uses the so called “Rule of the thumb”. It is a series of formulas how the several parts of game influences each other. As this guide is mostly for new players, i won't hammer now all these details into you. If anyone is interested about it, he can use the below link for details. Let's just say that everything in this game is connected by these formulas and it can be hard to find the correct balance to be most efficient.
  Luckily some people programmed calculators to make it much easier to level your ancients. In these calculators you just copy/paste your safe text after ascension and they can tell you how to use your HS the best way. For more information how the calcs work, please visit the sites and read the FAQs. Here is the link to the calc i use and to several others.
  Rule of the Thumb: https://www.reddit.com/r/ClickerHeroes/comments/339m3j/thumbs_up_the_rules_of_thumb/
  The calculator I use: https://kepow.org/clickerheroes/
  Other calculators and helpful links: https://www.reddit.com/r/ClickerHeroes/wiki/calculators
  What are Gilds and how does they work?
  Gilds are special buffs you will get for your heroes. After you reached level 100 you will get one Gild for a random hero any time you cleared every 10th zone for the first time (110, 120, 130 and so on). The Gilds will give the hero a cumulative 50% damage buff. So if a hero has 4 Gilds he will have +200% damage. This buff will get much stronger as soon as you get the Ancient Argaiv who will boost the buff. In the Gilded section below the Hero overview you can move Gilds to other heroes by spending 80 HS per Gild. Just hold down SHIFT and left click on the hero which shall receive the Gild. If you want to move all Gilds to one hero just hold down Q and left click. You can move Gilds anytime you want even within one run, if you have enough HS left.
  So why should you move Gilds around? Every hero has a specific level/damage ratio and after you reached around zone 200+ you might want to start moving Gilds to the most effective hero. For example, after you reached zone 120-130 you will get Frostleaf who will give you an extreme damage boost. But Frostleaf, and also Dread Knight after that, have both a very bad ratio. You can level them to 75-100 to get the skills but I don't recommend to level them further. Instead you should start moving Gilds to “The masked Samurai” slowly and only level her. She has the best ratio before you reach the Rangers (Rangers are the Heroes after Dread Knight, starting with Atlas).
  In your first runs and until you transcend the first time you should just push Samurai. Later on you will reach a point where the ratio of Samurai isn't good enough anymore. At this point you should switch to the highest available Ranger which you can get to level 400-500. Level this Ranger up and Re-Gild all Gilds to him. Keep in mind to hold back some HS when leveling you Ancients for possible on-the-run Re-Gilds.
  For later mid and end game runs you will have to Re-Gild several times within one run. I found a good formula for that in another post and tested it extensively and it works very well. As soon as you reach the rangers you start to level your current Ranger to 1500. At this point the next Ranger can get to 1000 and be able to get the 1st x10 buff. So you Re-Gild to next Ranger and level him up to 1500 again. Then switch to next ranger and so on. This will keep you in the best level/damage ratio. If you now say: “Oh my god, so many wasted Hero Souls”, don't fret. At this point of the game you will earn so many HS that you don't even notice this anymore.
  Relics
  After you cleared zone 100, you will get a Relic for the first time by killing a special mob. Relics are special items that give level bonuses to Ancients. You can have 4 Relics equipped max at any time and you can't ascend before salvaging any extra Relics. So it's not possible to keep different Relic-Sets for different setups, unfortunately. Please note that you will receive the Ancient bonus from Relics even if you don't own that Ancient yet. If, for example, you find a +3 level Atman relic and don't have Atman yet, the game will treat it as if you have a level 3 Atman now.
  There are three ways to acquire Relics.
  In every run that will get past zone 100 you get the Relic mob again once. This mob may appear randomly in any zone between 100 and your highest reached zone (HZE). So if your HZE is 1500 it can appear at zone 120 but as well on zone 1350, but you will get it latest on 1500. Important is, that the level of the Relic is determined by the zone it dropped in. If you are unlucky it drops right at the beginning and will be totally useless.
  By mercenary missions. This is the best way to get Relics, because Relics from missions are always determined by your HZE. See next section for more information on mercenaries and missions.
  By spending Rubies. In the shop you can buy 3 Relics for 40 Rubies. These Relics are also determined by your HZE. Imo this is a waste of Rubies. But if you have a lot of Rubies left you might want to go for it.
  What bonus you want on your Relics depends on your playstyle. If you are an Idler, you might wanna have passive bonus on the expensive Ancients like Atman, Dora, Fortuna. Don't go for Ancients like Fragsworth, Libertas, Mammon and so on. You will get levels there so fast that the Relics don't make a big difference. For hybrid and active players i recommend Atman/Vaagur + skill durations. Best skills for duration are Lucky Strikes and Metal Detector (see “Buffs” in section General Tips)
  Mercenary and Missions
  When you reach zone 140 the Mercenaries tab will get unlocked. From now on you can hire Mercenaries by starting an 8 hour mission or spend Rubies. You can have up to 5 Mercenaries at any given time. They have a fixed lifetime, can die and then need to be replaced. For more details check the mercenary section on wikia.
  After you get you first merc you can send him on missions. There are several mission-types but imo only two that are really useful. First the Relic missions and second the HS missions. The Gold missions might be nice at the start but later on you don't really need them anymore.
  I reached zone 300, what now?
  The above sections are mostly anything you need to know to reach and complete zone 300 pretty fast. After you cleared zone 300 you can transcend for the first time. The Transcendence is a big change in the game and includes a lot of new information. If you haven't reached zone 300 yet, I recommend to stop reading now and just enjoy the game for a while, otherwise it might come to an information-overload.
  If you cleared zone 300 then congrats and please continue with the next section.
  Transcendence (Mid-Game)

  My first Transcendence, what is that?
  Transcendence is a soft reset in the game. It will give you several new options to improve and a new currency, Ancients Souls (AS). In the following Paragraphs I'll try to give you and overview about what happens and how to handle it. As before I won't get to deep into details and formulas, if you are interested in that I would recommend the wikia section again.
  After us use Transcendence, the game will reset to Zone 1 and you loose most of everything you achieved so far. That sounds pretty bad for the moment, but what you will get in return is worth it. It will speed up your game a lot.
  What will I loose? You will loose every Ancient, Relic, Hero Soul, Gild and HZE progress you made so far.
  What will I keep? You keep all mercenaries as well as their mission progress and all Rubies. Also for a later Transcendence, you will keep progress in Outsiders (see below).
  What will I get? You get Transcendent Power and Ancient Souls (AS) to level up Outsiders.
  Outsiders
  Outsiders are a new form of Buffs similar to Ancients but they work in another way. They can be found in the Transcendence tab and can be leveled by using AS. You can respec the Outsiders, but only after a Transcendence. Because of that I recommend to make an extra save with a different name before any Transcendence, in case you made a mistake and noticed it to late.
  There are 5 different Outsiders and the buffs they give are very powerful. But like everything else in this game, you need to level them carefully and balanced to get a good efficiency. For that u can use the following spreadsheets
  https://docs.google.com/spreadsheets/d/1LlW5ZJUY5QuQlkdk1FRWrsOeB8PuWQwig9L-ZyRUekY/edit?pref=2&pli=1#gid=1843865711
  https://docs.google.com/spreadsheets/d/1m09HoNiLW-7t96gzguG9tU_HHaRrDrtMpAoAuukLB4w/edit#gid=1908925604
  Gaining Ancient Souls and when to transcend.
  You will gain AS as soon as you transcend. The amount of AS depends on how many Hero Souls you earned in your current Transcendence. You can check the details in the Transcendence-tab. In the upper right corner there are three values. The first shows you how many AS you posses at the moment. The second line shows you how many AS you would gain, if you transcend right now. The third line shows you how many more hero souls you need to earn your next AS.
  So when do you transcend? There isn't a real rule for that. Mostly its about how hard it gets to gain a new AS. I for myself play mostly until I need more then 1-2 runs to get 1 AS. At this point I normally earned around 7-10 AS and reached the reward cap a while ago. But you can go on longer if u want to or didn't earned enough AS yet.
  For the first Transcendence I recommend around 10 AS. I did it with 20 AS the first time because I didn't understood how Transcendence worked then. It sped up my next runs a lot I can tell you, but you don't need to wait that long, 10 should be fine.
  Transcendence Power and Primal Reward
  Ok with this topic I still have some problems to understand the background totally, if I'm honest. Everyone is welcome to check the formulas on wikia and try to figure it out better. But I will give you the explanation on how it works and influences your game.
  After you transcend you will get an extra bonus HS reward when killing Primal bosses. This reward increases if you progress deeper down the zones and is influenced by two things. First it's the primal reward cap. This cap depends on how many HS you earned in total this far and the levels you have in Borb. Second it's your Transcendence Power which is a fixed amount and can be increased by leveling Phandoryss. Transcendence Power determines how much more HS you get when you progress deeper until you reach the cap. The following examples are ONLY to give you an understanding how that works, they are NOT accurate regarding the formulas.
  Let's say you only level Borb to get a very high reward cap. Your cap is now 100K HS and you will get more and more HS with every Primal until you reach the cap. But as you only leveled Borb you would need to get to zone 700 to reach the cap. Now you add a levela in Phandoryss and suddenly you only need to go to level 600 to reach the cap. Thus you will progress faster and get more HS earlier. This in return will result in more levels for your Ancients and let you go deeper faster. Also levels in Solomon increase the amount of HS you get and moves the cap closer every time you level him. Especially with the Ponyboy buff you can get the cap into reachable zones pretty fast. That's what I meant when I was talking about the balance. If you level one of the Ancients or Outsiders without the others you could be slowing down you gameplay a lot.
  Preparations before using Transcendence
  As explained before, the Transcendence is a soft reset and you will loose all Ancients. That can really be a pain for the first run after Trans, because you would have to make this several hours long run manually again. To avoid that, there are a few steps you can take. First, have at least 50 Rubies ready to make a Quick Ascension (QA) right at the start. I recommend to have better 100-140 so u can use 2 QAs and maybe some Time-lapses. So if you are getting closer to a Transcendence, better start keeping these Rubies together. When you use the QA you will get 7 HS and can get 1-3 Ancients to speed up the run a bit. Also you will get access to your Mercenaries again, which brings us to the next point.
  Before the Transcendence, yous should have your high level Mercs run and finish some Relic runs. In the best case you should have 2-3 finished missions with 7-8 Relics reward in total. The other 2-3 Mercs should run long time gold missions and should have finished them also. After the Trans and the QA you now have a lot of Relics right at the beginning, which can help a lot (depending on your drop luck). Don't use the gold missions yet. Just start the run and every time you hit a wall turn in one of the missions. Keep the now free Mercs on short time gold missions to keep it flowing.
  If you follow this, and with a bit of luck with Ancients and Relics, you are able to shorten the first run time from 5-6 hours to 30 mins.
  I transcended, what next?
  Regarding the game mechanics that's it. Now your job is to earn more AS get deeper and transcend when you are ready. With every Transcendence you will get higher reward caps and be able to progress deeper. So have fun :)
  General Tips and Tricks

  In this section I want to share some tips and hints regarding the gameplay that can make the game easier or faster. Most of it depends on my own playstyle but maybe you get some ideas and can adapt it to your own.
  Buffs and Relics
  For active and hybrid build the most important and helpful buff by far is Lucky Strikes, followed by Metal Detector. Let me explain why. In the later game, when you hit zones of 1000+, your normal click damage is pretty much worthless regarding deeper progress. The only thing that really hurts the mobs are crits. Now, after you have all skills you have a 9% crit chance. This value can't be changed by anything besides the Lucky Strikes buff. That means that you will crit every ~11th click in general. But (there's always a but) a chance is a chance, and believe me this game likes it to piss you off. Many times I was at a mob and had to click 70 to 90 times to get that damn crit. And if a mob needs 3 crits to die you can get really pissed off.
  To avoid rip out all your hair or throw you mouse against the wall, just push your lucky strikes. I keep every Lucky Strikes Relic I can get my hands on, and in later zones they can be really powerful (100-200 levels to Sniperino). If you also level your Vaagur, you can get close to the point where you always have the crit buff. In my last transcendence, for example, I was very lucky. I had my Lucky Strikes CD down to 13 mins and the duration up to 12 mins. Nearly all the time crit buff, makes the life MUCH easier.
  My Optimal Relic would be: Sniperino, Vaagur, Atman and Energon.
  For a complete Idle build I have a tactic I read about but didn't try it out yet as I don't play Idle. Like you get Sniperino up for click build you go for Berserker and Energon and get their duration up. Important, don't level Vaagur in any kind, you don't want CD reduction. As soon as these 2 buffs reach around 4-5 minutes duration you can start using them to progress deeper when you hit walls. Just use them both, wait a minute till Idle kicks back in and you will have 3-4 minutes double damage and gold drop. The goal is to get them up to 10 Minutes duration, so you get full 9 minutes buff-time for each Idle interruption.
  As I said, I just read about it (forgot where), so no guarantees. Maybe I'll try it out if I find a good matching relic. If I got news on this I'll update here.
  edit: Just found some very good relics and was able to push my Powersurge to 450 sec duration. I tested this tactic and it works perfect. With pre-used energize i was able to get 13 minutes of 3x damage within 15 mins by loosing 2 minutes of idling only.
  The Dark Ritual
  In earlier versions of CH there was a way to get a lot of Ritual buffs in a short period of time, using Energize and Reload. This has been fixed but if you have a high Vaagur you still can get 4-6 Buffs in one run. Right after you get Energize and Reload, use an energized Ritual and Reload. Wait till Energize and Reload is available again. Use Energize then Reload, this will reduce Ritual CD by another hour. Before the fix u could go on like this but it only works once now. But at least you can reduce Ritual CD by 2 hours. Depending of Vaagur level the Ritual should be available much faster now.
  Buff Rotation
  These are two examples for my buff rotation for the active phase after idling in hybrid.
  Situation: Not many Sniperino levels yet, 2-3 mins duration. Hybrid Ratio 0.5 (see calculator). CD reduction around 30-45%
  After starting active clicking: 1 + 2 to get past the levels fast where I won't get gold.
  Wait for 1 and 2 to be ready: 1 + 2 + 3 + 4
  Wait for 3 and 4 to be ready: Use 1 and 2 when ready in between
  All CDs ready: 1 + 2 + 3 + 9
  Wait for 1 and 2 to be ready: 1 + 2 + 8 + 3 + 4 + 5
  Wait for effect of 1 and 2 to run out then use 7 while 3 is still active
  Situation: Good Sniperino levels, at least 5-6 mins duration. Hybrid Ratio 1 – 1.5. CD reduction 45% +
  After starting active clicking: 1 + 2 to get past the levels fast where I won't get gold.
  Wait for 1 and 2 to be ready: 1 + 2 + 3 + 9
  Wait for 1 and 2 to be ready: 1 + 2 + 8 + 3 + 4 + 5
  Wait for effect of 1 and 2 to run out then use 7 while 3 is still active
  Wait for 3 and 4 to be ready: Use 1 and 2 when ready in between
  Wait for CDs to refresh: 1 + 2 + 3 + 4
  Wait for 3 and 4 to be ready: Use 1 and 2 when ready in between
  All CDs ready: 1 + 2 + 3 + 9
  Wait for 1 and 2 to be ready: 1 + 2 + 8 + 3 + 4 + 5
  Wait for effect of 1 and 2 to run out then use 7 while 3 is still active
  As I get more levels in Sniperino and Vaagur I change my Hybrid ratio more and more to active. When I'm close to 10 Minutes Lucky Strikes I'm mostly at 3-4 ratio. If I reach full duration of Lucky Strikes (CD = Duration) I change to Ratio 5. As soon as you reach long duration Sniperino you start using Reload on Super clicks or Metal Detector instead of Lucky Strikes.
  Closing Remarks and Thanks

  Ok, that's it. I just wanted to help new players and now it got much longer then I anticipated. I would really like to thank all the creators of the different Reddit-posts and guides I used in the last 3 weeks by name. But to be honest, there were so many and I swapped between them so fast that I can't remember. If you recognize yourself in any of the material I used, please know that this Thank you is meant for you!`
};

export default PostDetail;
