import Image from "next/image";

const TEAM = [
    {
        category: "Leadership",
        members: [
            { name: "Siva Epuri", role: "President", major: "Public Health", funFact: "I love spending time outdoors.", image: "/bio/siva (1).jpeg" },
            { name: "Aryianah Wilson", role: "Vice President", major: "Computer Science", funFact: "I love writing spoken word poetry.", image: "/bio/aryianah (1).jpeg" },
        ]
    },
    {
        category: "Outreach & Engagement Committee",
        members: [
            { name: "Adya Chawda", role: "Co-lead", major: "Neuroscience", funFact: "I know four languages.", image: "/bio/adya2.jpeg" },
            { name: "Aleesha Kumar", role: "Co-lead", major: "Public Health", funFact: "I enjoy photography, gardening, and watching movies and shows.", image: "/bio/aleesha.jpeg" },
            { name: "Min Bao", role: "Member", major: "Neuroscience", funFact: "I've learned six instruments in my free time and am looking for more!", image: "/bio/monica.jpeg" },
            { name: "Snigdha Patlola", role: "Member", major: "Neuroscience", funFact: "I have a scar on my forehead from running into a wall!", image: "/bio/snigdha (1).jpeg" },
            { name: "Sriya Tanguturi", role: "Member", major: "Public Health", funFact: "I've pet an elephant before!", image: "/bio/sriya.jpeg" },
        ]
    },
    {
        category: "Research Committee",
        members: [
            { name: "Aasritha Senagapally", role: "Lead", major: "Biochemistry", funFact: "I love to read! Currently, my fixation is murder mystery.", image: "/bio/aasritha.jpeg" },
        ]
    },
    {
        category: "Map Improvement Committee",
        members: [
            { name: "Isha Jannu", role: "Lead", major: "Computer Science", funFact: "I love cafe hopping and finding new favorite sweet treats!", image: "/bio/isha.jpeg" },
            { name: "Mehal Kanhere", role: "Member", major: "Electrical & Computer Engineering", funFact: "I love going hiking and camping.", image: "/bio/mehal.jpeg" },
        ]
    }
];

export default function OurTeam() {
    return (
        <>
            <div className="header flex flex-col gap-2">
                <h1 className="text-text-primary text-4xl sm:text-5xl font-bold">Meet Our Team</h1>
                <p className="description text-text-secondary text-lg sm:text-xl max-w-3xl">
                    Learn more about the amazing individuals behind the ATX Food Hub initiative!
                </p>
            </div>

            <div className="flex flex-col gap-12">
                {TEAM.map((section) => (
                    <section key={section.category} className="team-section">
                        <h2 className="text-primary text-2xl font-bold mb-6 border-b border-white/10 pb-2">{section.category}</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            {section.members.map((member) => (
                                <div key={member.name} className="team-member bg-white/10 p-6 rounded-2xl shadow-lg border border-white/5 hover:border-primary/30 transition-all group">
                                    <div className="relative w-full aspect-square mb-4 rounded-xl overflow-hidden transition-all duration-300">
                                        <Image
                                            src={member.image}
                                            alt={member.name}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <h3 className="text-primary text-xl font-bold mb-1">{member.name}</h3>
                                    <p className="text-text-secondary text-sm font-medium mb-2">{member.role} | {member.major}</p>
                                    <p className="text-text-secondary text-sm italic">&quot;{member.funFact}&quot;</p>
                                </div>
                            ))}
                        </div>
                    </section>
                ))}
            </div>

            <hr className="border-white/10" />
        </>
    );
}
