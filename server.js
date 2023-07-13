import { Configuration, OpenAIApi } from "openai";
import { createClient } from '@supabase/supabase-js';


export const supabase = createClient(url, key);
async function generateEmbeddings() {
    const configuration = new Configuration({ apiKey: 'openaiKey' });
    const openAi = new OpenAIApi(configuration);

    //like below pdf and other source data trun into documents 
    const documents = [
        "rajashekhar is full stack developer",
        "rajashekhar have a website raja.com",
        "As an Associate Architect with 11+ years of experience, I have honed my skills as a Full StackDeveloper, I bring a wealth of knowledge and expertise to the table. My skillset includes React, front-enddevelopment, UI/UX design, and the creation of reusable component libraries. With a strongbackground in coding, I am dedicated to creating cutting-edge, user-friendly applications that exceedexpectations. Whether working independently or as part of a team, I pride myself on delivering quality results",
        'Proficient in utilizing React form hooks and yup validation to create dynamic and robust forms, enhancing website performance through efficient utilization of react query cache.',
        'Implemented React internationalization to facilitate multi-language support for applications.',
        'Worked on storybook and rollup bundler for npm library development.',
        'Developed and published a comprehensive reusable components npm library for React, created a flexible theming and branding system to meet diverse customer requirements.',
        'Expertise in implementing custom theming using the SCSS architecture.',
        'Worked on React charts for data analysis and visualization purposes.',
        'Collaborated on a proof of concept (POC) project integrating Power Apps with React, successfully integrating React into Power Apps during the POC phase for seamless functionality.',
        'Designed and established project architectures using React, TypeScript, and ESLint, configuring and extending the Power Apps webpack for customized functionality.',
        'Contributed to the development of a robust Life Sciences Product Platform (Document Management System) using Power Apps and React, leading the development of product component modules, managing a team to create high-quality and reusable components aligned with product roadmaps and customer needs.',
        'Played a crucial role in developing Klusternetes project, utilizing React, Firebase, SCSS, CoreUI, GitHub Actions, and Puppeteer to design and implement complex systems.',
        'Leveraged WordPress development skills to create engaging and modern websites, including notable projects such as Zelar.',
        'Specialized in Magento theme integration and customization for various high-profile clients, improving web performance through techniques like CSS/JS minification and image optimization.',
        'Proficient in UI/UX design, collaborating with product owners for requirement gathering, conducting competitor analysis, and creating wireframes and design mock-ups.',
        'Developed and integrated hybrid (Android/IOS) apps using Angular, Angular Material, Ionic, HTML, CSS, SCSS, Flexbox, Adobe XD, and Illustrator, mentoring team members and providing technical support.',
        'Actively communicated and collaborated with team managers and cross-functional teams in internal and external meetings, ensuring effective coordination.',
        'Played a key role in graphic design, template creation, layout design, theme development, and visual promotions under the guidance of the Creative Director.',
    ]

    for (const document of documents) {
        const input = document.replace(/\n/g, '');

        // Create Embedding
        const embeddingResponse = await openAi.createEmbedding({
            model: "text-embedding-ada-002",
            input
        });

        const [{ embedding }] = embeddingResponse.data.data;

        const { data, error } = await supabase
            .from('documents')
            .insert({
                content: document, 
                embedding
            })
    }

}

generateEmbeddings();