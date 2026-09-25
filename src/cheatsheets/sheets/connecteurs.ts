import type { Sheet } from "@/cheatsheets/types";

const sheet: Sheet = {
  id: "connecteurs",
  title: "连接词",
  summary: "把短句串成一段话",
  lead: "只会说短句，听起来像在念单词表。加上几个连接词，同样的内容马上像一段完整的话，TCF 口语和写作也专门看这一点。",
  sections: [
    {
      title: "1. 最基本的七个",
      blocks: [
        {
          kind: "table",
          head: ["意思", "法语", "例子"],
          fr: [1, 2],
          rows: [
            ["和", "et", "J'aime le thé et le café."],
            ["但是", "mais", "C'est cher, mais c'est bon."],
            ["或者", "ou", "Tu veux du thé ou du café?"],
            ["因为", "parce que", "Je reste ici parce qu'il pleut."],
            ["所以", "donc", "Il pleut, donc je reste ici."],
            ["如果", "si", "Si tu veux, on y va."],
            ["当……时", "quand", "Quand il pleut, je reste ici."],
          ],
        },
        {
          kind: "tip",
          text: "元音前省音：[[parce qu'il]]、[[s'il]]。但 si 只在 il、ils 前省，[[si elle]] 不变。",
        },
      ],
    },
    {
      title: "2. 讲顺序：先、然后、最后",
      blocks: [
        {
          kind: "table",
          head: ["法语", "意思"],
          fr: [0],
          rows: [
            ["d'abord", "首先"],
            ["ensuite", "接着"],
            ["puis", "然后"],
            ["après", "之后"],
            ["enfin", "最后（列举的最后一项）"],
            ["finalement", "最终、结果"],
          ],
        },
        {
          kind: "examples",
          items: [
            {
              fr: "**D'abord**, je prends un café. **Ensuite**, je lis mes mails. **Enfin**, je commence à travailler.",
              zh: "我先喝杯咖啡，接着看邮件，最后开始工作。",
            },
          ],
        },
      ],
    },
    {
      title: "3. 补充、对比、举例",
      blocks: [
        {
          kind: "table",
          head: ["作用", "法语", "意思"],
          fr: [1],
          rows: [
            ["补充", "aussi", "也"],
            ["补充", "en plus", "而且、另外"],
            ["对比", "par contre", "相反、不过（口语）"],
            ["对比", "pourtant", "然而、可是"],
            ["对比", "cependant", "然而（书面）"],
            ["让步", "même si", "即使"],
            ["举例", "par exemple", "比如"],
          ],
        },
        {
          kind: "examples",
          items: [
            {
              fr: "L'appartement est petit. **Par contre**, il est bien situé.",
              zh: "公寓很小，不过位置很好。",
            },
            { fr: "**Même si** c'est difficile, je continue.", zh: "即使很难，我也坚持。" },
          ],
        },
      ],
    },
    {
      title: "4. 表达观点",
      blocks: [
        {
          kind: "table",
          head: ["法语", "意思"],
          fr: [0],
          rows: [
            ["À mon avis, …", "依我看……"],
            ["Je pense que …", "我认为……"],
            ["Je trouve que …", "我觉得……"],
            ["D'un côté …, de l'autre …", "一方面……另一方面……"],
            ["Je suis d'accord.", "我同意"],
            ["Je ne suis pas d'accord.", "我不同意"],
            ["En conclusion, …", "总之……"],
          ],
        },
        {
          kind: "examples",
          items: [
            {
              fr: "**À mon avis**, le télétravail est pratique. **D'un côté**, on gagne du temps. **De l'autre**, on se sent parfois seul.",
              zh: "依我看，居家办公很方便。一方面省时间，另一方面有时会觉得孤单。",
            },
          ],
        },
      ],
    },
    {
      title: "5. 容易混的几对",
      blocks: [
        {
          kind: "table",
          head: ["", "后面跟", "例子"],
          rows: [
            ["[[parce que]]", "一个句子", "[[Je suis en retard parce que le bus est en retard.]]"],
            ["[[à cause de]]", "一个名词", "[[Je suis en retard à cause du bus.]]"],
            ["[[pourquoi]]", "提问：为什么", "[[Pourquoi tu pars?]]"],
            ["[[parce que]]", "回答：因为", "[[Parce que je suis fatigué.]]"],
          ],
        },
        {
          kind: "tip",
          text: "说将来的事，[[quand]] 后面也要用将来时：[[Quand je serai à Paris, je t'appellerai.]] 中文说“等我到了巴黎”，法语却要说“当我将在巴黎”。",
        },
      ],
    },
  ],
};

export default sheet;
