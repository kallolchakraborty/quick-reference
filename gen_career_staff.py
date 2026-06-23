#!/usr/bin/env python3
import json, os

OUT = "/Users/kallolchakraborty/Proof Of Concepts/Quick Reference - GitHub Pages/content/patterns/career-staff.json"

def bd(label, color="#E95420"):
    bg = f"rgba({','.join(str(int(color[i:i+2],16)) for i in (1,3,5))},0.08)"
    return f'<div style="margin-bottom:16px"><span style="display:inline-block;background:{bg};border:1px solid {color};color:{color};font:700 10px system-ui;padding:3px 10px;border-radius:99px;letter-spacing:.05em">{label}</span></div>'

def mg(items):
    r = "".join(f'<div style="background:#f8fafc;border:1.5px solid #e2e8f0;border-radius:8px;padding:14px">{item}</div>' for item in items)
    return f'<div style="margin:16px 0;display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:10px">{r}</div>'

def tb(hd, rows):
    th = "".join(f'<th style="padding:10px 12px;border-bottom:2px solid #e2e8f0;color:#475569;font-weight:700;text-align:left;font-size:11px">{h}</th>' for h in hd)
    tr = ""
    for i, r in enumerate(rows):
        bg = 'background:#fafafa' if i%2 else ''
        tr += f'<tr style="border-bottom:1px solid #f1f5f9;{bg}>' + "".join(f'<td style="padding:9px 12px;font-size:12px{f";font-weight:600" if j==0 else ""}">{c}</td>' for j,c in enumerate(r)) + '</tr>'
    return f'<div style="margin:16px 0;overflow-x:auto"><table style="width:100%;border-collapse:collapse;font:12px system-ui,sans-serif"><thead><tr style="background:#f1f5f9;text-align:left">{th}</tr></thead><tbody>{tr}</tbody></table></div>'

S = []

S.append({
    "id": "career-staff-1",
    "title": "The Staff+ Career Landscape: Levels, Tracks & Expectations",
    "category": "career",
    "subcategory": "Staff+ Career",
    "description": bd("LEVELS . TRACKS . EXPECTATIONS", "#4285F4") + """<p>The Staff+ career track varies significantly across FAANG. Understanding the expectations at each level is essential. At this level, you operate with strategic autonomy, defining problems rather than solving assigned ones.</p>""" + tb(["Level", "Google", "Amazon", "Meta", "Scope", "Timeframe"],
        [
            ["Staff / L6", "Staff SWE", "SDE III", "E6", "Team/org (20-50)", "12-18 months"],
            ["Senior Staff / L7", "Senior Staff", "Principal", "E7", "Organization (50-200)", "18-24 months"],
            ["Principal / L8", "Principal", "Sr. Principal", "E8", "Multiple orgs (200+)", "24-36 months"],
            ["Distinguished / L9", "Distinguished", "Principal Engineer", "E9", "Company-wide", "3-5 years"],
        ]) + """<p><b>Key Insight:</b> The jump from Senior (L5/E5) to Staff (L6/E6) requires a mindset shift from individual output to organizational leverage.</p>""" + mg([
        "<div><b style='color:#4285F4'>Individual Output</b><br><span style='font-size:11px;color:#475569'>Senior: you write great code</span></div>",
        "<div><b style='color:#FF6600'>Team Leverage</b><br><span style='font-size:11px;color:#475569'>Staff: your code makes others faster</span></div>",
        "<div><b style='color:#E95420'>Org Amplification</b><br><span style='font-size:11px;color:#475569'>Principal: your patterns shape the org</span></div>",
        "<div><b style='color:#4285F4'>Industry Influence</b><br><span style='font-size:11px;color:#475569'>Distinguished: you shape the industry</span></div>",
    ]) + """<p><b>Promotion Criteria:</b> You must have operated at the next level for 6-12 months before the promo packet is strong enough. Start building your case on day one.</p>"""
})

S.append({
    "id": "career-staff-2",
    "title": "Preparing Your Staff+ Promotion Packet",
    "category": "career",
    "subcategory": "Staff+ Career",
    "description": bd("PROMOTION . PACKET . ARTIFACTS . IMPACT", "#FF6600") + """<p>A weak promotion packet is the #1 reason promos stall. Your packet must tell a coherent story of impact at the Staff+ level.</p><p><b>Essential Artifacts:</b></p>""" + mg([
        "<div><b style='color:#4285F4'>Impact Summary</b><br><span style='font-size:11px;color:#475569'>1-page: what you did, why it mattered, how the org changed</span></div>",
        "<div><b style='color:#FF6600'>Design Docs & RFCs</b><br><span style='font-size:11px;color:#475569'>3-5 key documents showing technical leadership</span></div>",
        "<div><b style='color:#E95420'>Code & Architecture</b><br><span style='font-size:11px;color:#475569'>Links to key PRs, system designs, decisions</span></div>",
        "<div><b style='color:#4285F4'>Mentorship Evidence</b><br><span style='font-size:11px;color:#475569'>Growth of mentees, talks given, onboarding improvements</span></div>",
        "<div><b style='color:#FF6600'>Cross-Functional Impact</b><br><span style='font-size:11px;color:#475569'>Work with product, design, data science</span></div>",
        "<div><b style='color:#E95420'>Peer & Manager Letters</b><br><span style='font-size:11px;color:#475569'>Testimonials describing your Staff+ behaviors</span></div>",
    ]) + tb(["Element", "Question", "Staff+ Example"],
        [
            ["Situation", "What was the context?", "Payment platform serving 10M+ daily transactions"],
            ["Task", "What needed to happen?", "Migrate from monolith to microservices without downtime"],
            ["Action", "What did YOU do?", "Designed migration strategy, wrote interface contracts, coordinated 3 teams"],
            ["Result", "What measurable impact?", "Zero downtime, 40% latency reduction, 2x team velocity"],
            ["Leverage", "How does this scale?", "Patterns adopted by 4 teams; 2 RFCs became org standards"],
        ]) + """<p><b>Common Packet Mistakes:</b> Listing projects instead of impact. Not quantifying results. Claiming team credit without showing personal contribution. Writing too technically for leadership audience.</p>"""
})

S.append({
    "id": "career-staff-3",
    "title": "Staff+ Resume & LinkedIn Optimization",
    "category": "career",
    "subcategory": "Staff+ Career",
    "description": bd("RESUME . LINKEDIN . BRANDING", "#E95420") + """<p>At Staff+, every resume bullet should communicate impact density and organizational leverage.</p><p><b>Staff+ Resume Rules:</b> Impact per line. Quantify everything. Lead with scope. Remove junior tasks. One page max.</p>""" + mg([
        "<div><b style='color:#4285F4'>Generic</b><br><span style='font-size:11px;color:#475569'>'Led migration of payment system'</span></div>",
        "<div><b style='color:#FF6600'>Better</b><br><span style='font-size:11px;color:#475569'>'Defined migration for platform processing $5B/year across 3 regions'</span></div>",
        "<div><b style='color:#E95420'>Staff+</b><br><span style='font-size:11px;color:#475569'>'Architected payment platform migration (10M+ txn/day, $5B/year) with zero downtime; patterns adopted by 4 teams'</span></div>",
    ]) + """<p><b>LinkedIn:</b> Headline should state level and domain. About section: 3-paragraph narrative (what you do, key achievements, what's next). Feature your best design docs and talks.</p>"""
})

S.append({
    "id": "career-staff-4",
    "title": "Navigating the Staff+ Interview Process",
    "category": "career",
    "subcategory": "Staff+ Career",
    "description": bd("INTERVIEW PROCESS . SCREEN . ONSITE", "#4285F4") + """<p>The Staff+ interview process takes 4-8 weeks from initial screen to offer.</p>""" + tb(["Stage", "Duration", "What to expect", "Pass rate"],
        [
            ["Recruiter Screen", "30-45 min", "Level check, TC expectations, availability", "80%"],
            ["Hiring Manager Screen", "45-60 min", "Deep experience dive, behavioral, technical discussion", "60%"],
            ["Technical Phone Screen", "60 min", "Live coding or system design", "50%"],
            ["Virtual Onsite (4-5 rounds)", "4-6 hours", "System design, DSA, behavioral, product sense", "25-30%"],
            ["Staff+ Debrief", "1 hour", "Cross-functional panel evaluates packet", "N/A"],
            ["Team Matching", "Multiple", "Meet teams, discuss challenges and fit", "80%"],
            ["Reference Check", "1-2 weeks", "Your references get called", "95%"],
            ["Offer & Negotiation", "1-2 weeks", "TC proposal, negotiation", "Variable"],
        ]) + """<p><b>Staff+ Insight:</b> The committee doesn't just sum pass/fail per round. They look for the strongest signal across all dimensions. A single great system design round can compensate for mediocre coding if the design signals Staff+ level thinking.</p>"""
})

S.append({
    "id": "career-staff-5",
    "title": "Negotiating Staff+ Offers: TC, Equity & Sign-on",
    "category": "career",
    "subcategory": "Staff+ Career",
    "description": bd("NEGOTIATION . TC . EQUITY . OFFER", "#FF6600") + """<p>Negotiation at Staff+ can be worth $100K-$500K+ over 4 years. Leverage comes from competing offers.</p>""" + mg([
        "<div><b style='color:#4285F4'>Base Salary</b><br><span style='font-size:11px;color:#475569'>$200K-$350K. Negotiable only with competing offers.</span></div>",
        "<div><b style='color:#FF6600'>Initial RSU Grant</b><br><span style='font-size:11px;color:#475569'>$500K-$3M+ over 4 years. Primary negotiation lever.</span></div>",
        "<div><b style='color:#E95420'>Sign-on Bonus</b><br><span style='font-size:11px;color:#475569'>$50K-$200K cash. Usually 1-time.</span></div>",
        "<div><b style='color:#4285F4'>Annual Bonus</b><br><span style='font-size:11px;color:#475569'>10-30% of base. Performance-based.</span></div>",
        "<div><b style='color:#FF6600'>Refresher RSUs</b><br><span style='font-size:11px;color:#475569'>Annual equity grants. Varies by company.</span></div>",
        "<div><b style='color:#E95420'>Perks & Benefits</b><br><span style='font-size:11px;color:#475569'>Health, 401k, education budget, sabbatical.</span></div>",
    ]) + """<p><b>Strategy:</b> Never give first number. Always have competing offer. Negotiate RSUs first, then sign-on, then base. Understand vesting schedules (Google front-loads 33/33/22/12; Amazon back-loads 5/15/40/40). TC ranges (2026): L6/E6: $500K-$900K. L7/E7: $800K-$1.5M. L8/E8: $1.2M-$3M+.</p>"""
})

S.append({
    "id": "career-staff-6",
    "title": "Building a Staff+ Portfolio: Open Source, Talks & Writing",
    "category": "career",
    "subcategory": "Staff+ Career",
    "description": bd("PORTFOLIO . OSS . TALKS . WRITING", "#E95420") + """<p>An external portfolio provides third-party validation of Staff+ expertise.</p>""" + tb(["Activity", "Time", "Impact on Staff+ perception", "Difficulty"],
        [
            ["Conference talk", "40-80 hours", "Very high", "High"],
            ["Technical blog post", "10-20 hours", "High", "Medium"],
            ["Open source contribution", "5-20 hrs/month", "High", "Medium"],
            ["Published design doc", "10-30 hours", "Medium", "Low-Medium"],
            ["Internal tech talk", "5-10 hours", "Medium (internal)", "Low"],
            ["Social media posts", "1-2 hrs/week", "Low per post, compounding", "Low"],
        ]) + """<p><b>Strategy:</b> Pick ONE primary channel and go deep. Consistency over 12+ months beats one-off bursts. Focus on topics only you can share from your unique experience.</p>"""
})

S.append({
    "id": "career-staff-7",
    "title": "Choosing Between IC (Staff/Principal) vs EM (Engineering Manager)",
    "category": "career",
    "subcategory": "Staff+ Career",
    "description": bd("IC VS EM . TRACK . DECISION", "#4285F4") + """<p>The IC and EM tracks diverge at L6/E6. Choose based on what energizes you daily.</p>""" + tb(["Dimension", "Staff+ IC (L6+)", "Engineering Manager", "Hybrid (Manager of Managers)"],
        [
            ["Primary output", "Technical strategy, architecture", "Team health, delivery, people growth", "Org structure, both leaderships"],
            ["Time allocation", "50-70% coding/design", "10-20% coding, 80-90% people", "5-10% coding, 60-70% people"],
            ["Scope", "Technical decisions across teams", "People decisions within team", "Org-wide decisions"],
            ["Key skill", "Deep technical judgment", "Empathy, delegation, conflict resolution", "Strategic + organizational design"],
            ["Career ceiling", "Principal/Distinguished (L8+)", "Director/VP (M2+)", "CTO/VPE path"],
        ]) + """<p><b>Decision Framework:</b> Do you miss coding after a week in meetings? That's IC. Do you enjoy helping people grow more than solving hard tech problems? That's EM.</p>"""
})

S.append({
    "id": "career-staff-8",
    "title": "The First 90 Days as a Staff+ Engineer",
    "category": "career",
    "subcategory": "Staff+ Career",
    "description": bd("ONBOARDING . 90 DAYS . PLAN", "#FF6600") + """<p>The first 90 days set your trajectory. A strong start builds credibility and momentum.</p>""" + mg([
        "<div><b style='color:#4285F4'>Days 1-30: Learn</b><br><span style='font-size:11px;color:#475569'>Map org, understand systems, build relationships, identify quick wins</span></div>",
        "<div><b style='color:#FF6600'>Days 31-60: Contribute</b><br><span style='font-size:11px;color:#475569'>Deliver meaningful contribution, establish communication patterns</span></div>",
        "<div><b style='color:#E95420'>Days 61-90: Lead</b><br><span style='font-size:11px;color:#475569'>Drive technical initiative, influence without authority, set direction</span></div>",
    ]) + """<p><b>Days 1-30:</b> 1:1s with all stakeholders. Read every recent design doc. Ship something small. Identify the 3 biggest problems. Understand on-call.</p><p><b>Days 31-60:</b> Write RFC for first initiative. Present tech talk. Mentor one junior. Improve a process. Establish cross-functional syncs.</p><p><b>Days 61-90:</b> Drive first cross-team initiative. Define next quarter OKRs. Get manager and skip-level feedback. Publish your technical strategy.</p>"""
})

S.append({
    "id": "career-staff-9",
    "title": "Defining Your Technical Strategy & Roadmap",
    "category": "career",
    "subcategory": "Staff+ Career",
    "description": bd("STRATEGY . ROADMAP . RFC . VISION", "#E95420") + """<p>Defining technical strategy is THE defining Staff+ responsibility.</p>""" + tb(["Section", "Content", "Length"],
        [
            ["Executive Summary", "What and why now", "1 paragraph"],
            ["Context & Background", "Current state, history, what's working", "1-2 pages"],
            ["Problem Statement", "The specific problem addressed", "1 paragraph"],
            ["Guiding Principles", "Values driving decisions", "3-5 bullets"],
            ["Strategic Initiatives", "3-5 initiatives with rationale", "1-2 pages"],
            ["Non-Goals", "What this strategy does NOT address", "3-5 bullets"],
            ["Roadmap & Timeline", "Phased plan with milestones", "1 page"],
            ["Risks & Mitigations", "What could go wrong", "1/2 page"],
            ["Success Metrics", "How to measure progress", "3-5 metrics"],
        ]) + """<p><b>Writing Tips:</b> Lead with why. Make it opinionated. Include concrete examples. Acknowledge trade-offs. Share early and iterate.</p>"""
})

S.append({
    "id": "career-staff-10",
    "title": "Mentorship, Sponsorship & Building Your Network",
    "category": "career",
    "subcategory": "Staff+ Career",
    "description": bd("MENTORSHIP . SPONSORSHIP . NETWORK", "#4285F4") + """<p>Mentors give advice. Sponsors give opportunities. You need both.</p>""" + mg([
        "<div><b style='color:#4285F4'>Mentor</b><br><span style='font-size:11px;color:#475569'>Shares experience and advice. Low commitment.</span></div>",
        "<div><b style='color:#FF6600'>Sponsor</b><br><span style='font-size:11px;color:#475569'>Advocates for you. Creates opportunities. High commitment.</span></div>",
        "<div><b style='color:#E95420'>Coach</b><br><span style='font-size:11px;color:#475569'>Helps develop specific skills. Structured.</span></div>",
        "<div><b style='color:#4285F4'>Peer Network</b><br><span style='font-size:11px;color:#475569'>Colleagues at similar levels. Mutual support.</span></div>",
    ]) + """<p><b>Finding a Sponsor:</b> Deliver exceptional results. Make your manager's job easier. Be visible. Express ambition. Build multiple sponsor relationships.</p><p><b>Being a Mentor:</b> Ask questions before giving answers. Focus on mentee's goals. Be reliably available. Share failures. Recommend them for opportunities.</p>"""
})

S.append({
    "id": "career-staff-11",
    "title": "Navigating Politics & Organizational Dynamics",
    "category": "career",
    "subcategory": "Staff+ Career",
    "description": bd("POLITICS . ORG DYNAMICS . INFLUENCE", "#FF6600") + """<p>Politics is just how decisions get made without clear right answers. Navigate skillfully.</p>""" + tb(["Strategy", "When", "How", "Risk"],
        [
            ["Build alliances early", "Always", "Invest in peer and skip-level relationships", "None"],
            ["Write things down", "When decisions contested", "Publish RFCs, decision logs", "Perceived as slow"],
            ["Find the decision-maker", "When blocked", "Map org: who actually decides?", "Missing the real DM"],
            ["Create shared context", "Teams misaligned", "Cross-team syncs, shared OKRs", "Time investment"],
            ["Frame, don't blame", "Delivering bad news", "'We have a problem' not 'Team X caused it'", "None"],
            ["Escalate with solution", "Escalation needed", "'Choose A or B -- I recommend A'", "Wrong recommendation"],
        ]) + """<p><b>Principles:</b> Reputation is your currency. Disagree with ideas not people. Assume good intent. Build relationships outside your reporting line. Pick your battles.</p>"""
})

S.append({
    "id": "career-staff-12",
    "title": "Avoiding the Staff+ Plateau: Continuous Growth",
    "category": "career",
    "subcategory": "Staff+ Career",
    "description": bd("GROWTH . PLATEAU . LEARNING . STAFF+", "#E95420") + """<p>Many Staff+ engineers plateau 2-3 years after promotion. Avoid it with deliberate growth.</p>""" + mg([
        "<div><b style='color:#4285F4'>Technical Depth</b><br><span style='font-size:11px;color:#475569'>Become the undisputed expert in your domain.</span></div>",
        "<div><b style='color:#FF6600'>Technical Breadth</b><br><span style='font-size:11px;color:#475569'>Learn adjacent domains. Cross-domain insight is rare.</span></div>",
        "<div><b style='color:#E95420'>Organizational Scale</b><br><span style='font-size:11px;color:#475569'>From team to org to company influence.</span></div>",
        "<div><b style='color:#4285F4'>Strategic Thinking</b><br><span style='font-size:11px;color:#475569'>12-24 month vision. Connect tech to business.</span></div>",
        "<div><b style='color:#FF6600'>Communication</b><br><span style='font-size:11px;color:#475569'>Write more, speak more. Ideas only matter if they spread.</span></div>",
        "<div><b style='color:#E95420'>Industry Presence</b><br><span style='font-size:11px;color:#475569'>Talks, papers, OSS. Thought leadership beyond your company.</span></div>",
    ]) + """<p><b>Plateau Signals:</b> No new major skill in 12 months. Scope hasn't expanded. Not writing design docs anymore. Opinion not sought outside your area. Not mentoring anyone new.</p><p><b>Breaking Out:</b> Volunteer for cross-team initiative. Change teams or domains. Start a greenfield project. Teach what you know. Change companies.</p>"""
})

S.append({
    "id": "career-staff-13",
    "title": "When to Change Companies: Signals & Timing",
    "category": "career",
    "subcategory": "Staff+ Career",
    "description": bd("JOB CHANGE . SIGNALS . TIMING", "#4285F4") + """<p>Changing companies at Staff+ is high-risk and high-reward. Evaluate the signals.</p>""" + tb(["Signal", "What it looks like", "Action", "Risk"],
        [
            ["No growth", "No one to learn from", "Look for teams with Principal+ engineers", "HIGH -- skill atrophy"],
            ["Stalled promo", "No path to next level for 2+ years", "Consider internal transfer or external move", "MEDIUM -- frustration"],
            ["Product decline", "Product sunset or team shrinking", "Start networking before layoff", "HIGH -- RIF risk"],
            ["Culture mismatch", "Values don't align", "Explore quietly, don't burn bridges", "MEDIUM -- burnout"],
            ["Comp gap", "Below market for 6+ months", "Get competing offer; negotiate or leave", "MEDIUM -- leaving money"],
            ["Better opportunity", "Exceptional opportunity elsewhere", "Evaluate carefully", "LOW -- opportunity cost"],
        ]) + """<p><b>Timing:</b> Stay at least 18-24 months. Move with pull not push. Best time to interview is when you don't need to. Don't quit before a written offer. Staff+ job market is less liquid -- may take 3-6 months.</p>"""
})

S.append({
    "id": "career-staff-14",
    "title": "Staff+ Compensation Deep Dive: FAANG & Top Unicorns",
    "category": "career",
    "subcategory": "Staff+ Career",
    "description": bd("COMPENSATION . TC . EQUITY . FAANG", "#FF6600") + """<p>Equity is 50-70% of first-year TC at Staff+ level.</p>""" + tb(["Company", "L6/E6 TC Range", "Vesting", "Refresher Policy"],
        [
            ["Google", "$500K-$900K", "33/33/22/12 (front-loaded)", "Yearly, performance-based"],
            ["Meta", "$600K-$1M", "25% yearly (back-loaded)", "Yearly, generous at strong ratings"],
            ["Amazon", "$350K-$700K (L6)", "5/15/40/40 (back-loaded)", "Yearly, smaller at L6"],
            ["Apple", "$400K-$750K", "25/25/25/25", "Yearly, RSUs + cash"],
            ["Netflix", "$500K-$1M", "No cliff, monthly vest", "Annual comp review, all cash"],
            ["Stripe/Airbnb", "$500K-$900K", "25% yearly or front-loaded", "Yearly, competitive"],
        ]) + """<p><b>Negotiation Levers:</b> Google -- RSU front-loading. Meta -- competing offers. Amazon -- sign-on bonus ($100K-$200K). Netflix -- cash/options mix. Apple -- RSUs and cash. A competing FAANG offer is worth $100K-$300K.</p>"""
})

S.append({
    "id": "career-staff-15",
    "title": "Work-Life Balance & Burnout Prevention at Staff+",
    "category": "career",
    "subcategory": "Staff+ Career",
    "description": bd("BURNOUT . BALANCE . SUSTAINABILITY", "#E95420") + """<p>Staff+ engineers face high burnout risk from unbounded expectations and constant context switching.</p>""" + mg([
        "<div><b style='color:#4285F4'>Set Boundaries</b><br><span style='font-size:11px;color:#475569'>Define hours. Protect focus time. Say no to low-impact meetings.</span></div>",
        "<div><b style='color:#FF6600'>Delegate Effectively</b><br><span style='font-size:11px;color:#475569'>If you're the only one who can do it, you've failed to multiply.</span></div>",
        "<div><b style='color:#E95420'>Manage Energy</b><br><span style='font-size:11px;color:#475569'>Deep work in morning. Meetings in afternoon. Take real breaks.</span></div>",
        "<div><b style='color:#4285F4'>Support Systems</b><br><span style='font-size:11px;color:#475569'>Peers, mentor, therapist, exercise. Don't rely on work for fulfillment.</span></div>",
        "<div><b style='color:#FF6600'>Watch for Signs</b><br><span style='font-size:11px;color:#475569'>Cynicism, reduced efficacy, exhaustion, detachment.</span></div>",
        "<div><b style='color:#E95420'>Take Time Off</b><br><span style='font-size:11px;color:#475569'>Real vacation. The company will survive without you.</span></div>",
    ]) + """<p><b>Sustainable Pace:</b> Limit WIP to 2-3 major initiatives. Use no-meeting days (1-2/week). Prioritize radically. Career is a marathon, not a sprint.</p>"""
})

S.append({
    "id": "career-staff-16",
    "title": "Common Staff+ Career Questions & Evaluation Rubrics",
    "category": "career",
    "subcategory": "Staff+ Career",
    "description": bd("QUESTIONS . RUBRICS . PREP", "#4285F4") + """<p>Staff+ interviews evaluate career-oriented dimensions.</p>""" + tb(["Question", "What they evaluate", "Good response structure"],
        [
            ["Where do you see yourself in 3-5 years?", "Ambition, self-awareness, alignment", "Domain + scope + impact target"],
            ["Why this role/company?", "Research depth, motivation, fit", "Specific product/tech + skills + growth"],
            ["Biggest challenge at work?", "Resilience, learning from failure", "SARL: Situation-Action-Result-Lesson"],
            ["Influence without authority", "Communication, stakeholder mgmt", "Context + positions + strategy + outcome"],
            ["First 90 days plan?", "Onboarding strategy, judgment", "Learn + Quick wins + Relationships + Direction"],
            ["Why Senior to Staff?", "Motivation, Staff+ understanding", "Shift from output to organizational leverage"],
            ["What kind of impact?", "Self-awareness, level alignment", "Scale + type (technical, process, people)"],
        ]) + """<p><b>Rubric:</b> Self-awareness, strategic thinking, level alignment, motivation. Always run toward something, not away.</p>"""
})

S.append({
    "id": "career-staff-17",
    "title": "References & Further Reading",
    "category": "career",
    "subcategory": "Staff+ Career",
    "description": bd("BOOKS . BLOGS . COMMUNITIES . PODCASTS", "#E95420") + """<p>Key resources for Staff+ career development:</p>""" + mg([
        "<div><b style='color:#4285F4'>Books</b><br><span style='font-size:11px;color:#475569'>Staff Engineer (Will Larson), The Manager Path (Fournier), The Staff Engineer's Path (Reilly), An Elegant Puzzle (Larson)</span></div>",
        "<div><b style='color:#FF6600'>Blogs</b><br><span style='font-size:11px;color:#475569'>staffeng.com, blog.pragmaticengineer.com, danluu.com</span></div>",
        "<div><b style='color:#E95420'>Communities</b><br><span style='font-size:11px;color:#475569'>StaffEng Discord, Rands Leadership Slack, LeadDev</span></div>",
        "<div><b style='color:#4285F4'>Podcasts</b><br><span style='font-size:11px;color:#475569'>Staff Eng Podcast, Pragmatic Engineer, Software Engineering Daily</span></div>",
        "<div><b style='color:#FF6600'>Conferences</b><br><span style='font-size:11px;color:#475569'>LeadDev, StaffPlus, SREcon, O'Reilly Software Architecture</span></div>",
    ]) + """<p><b>Start Here:</b> Will Larson's Staff Engineer is the definitive guide. Then Tanya Reilly's The Staff Engineer's Path. Join StaffEng community for peer support.</p>"""
})

with open(OUT, 'w') as f:
    json.dump({"id": "career-staff", "title": "Staff+ Career Navigation", "sections": S}, f, indent=2)

total_size = os.path.getsize(OUT)
print(f"Wrote {OUT} ({total_size} bytes, {len(S)} sections)")
for i, s in enumerate(S):
    print(f"  {i+1:2d}. {s['title'][:55]:55s} desc={len(s['description']):6d}")
