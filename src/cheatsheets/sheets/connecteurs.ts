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
          head: ["意思", "法语", "英语", "例子"],
          fr: [1, 3],
          rows: [
            ["和", "et", "and", "J'aime le thé et le café."],
            ["但是", "mais", "but", "C'est cher, mais c'est bon."],
            ["或者", "ou", "or", "Tu veux du thé ou du café?"],
            ["因为", "parce que", "because", "Je reste ici parce qu'il pleut."],
            ["所以", "donc", "so", "Il pleut, donc je reste ici."],
            ["如果", "si", "if", "Si tu veux, on y va."],
            ["当……时", "quand", "when", "Quand il pleut, je reste ici."],
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
          head: ["法语", "意思", "英语"],
          fr: [0],
          rows: [
            ["d'abord", "首先", "first"],
            ["ensuite", "接着", "next"],
            ["puis", "然后", "then"],
            ["après", "之后", "after that"],
            ["enfin", "最后（列举的最后一项）", "finally, lastly"],
            ["finalement", "最终、结果", "in the end"],
          ],
        },
        {
          kind: "tip",
          text: "[[finalement]] 长得像英语 finally，意思却更接近 in the end、eventually（“结果到头来”）。列举到最后一项说“最后”要用 [[enfin]]。",
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
          head: ["作用", "法语", "意思", "英语"],
          fr: [1],
          rows: [
            ["补充", "aussi", "也", "also, too"],
            ["补充", "en plus", "而且、另外", "plus, what's more"],
            ["对比", "par contre", "相反、不过（口语）", "on the other hand"],
            ["对比", "pourtant", "然而、可是", "yet"],
            ["对比", "cependant", "然而（书面）", "however"],
            ["让步", "même si", "即使", "even if"],
            ["举例", "par exemple", "比如", "for example"],
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
            ["Je suis d'accord.", "我同意（英语 I agree 是动词，法语用 être）"],
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
        {
          kind: "tip",
          text: "英语 I think it's good 可以省掉 that，法语的 [[que]] **不能省**：[[Je pense que c'est bien.]]",
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
          text: "[[parce que]] 和 [[à cause de]] 就是英语的 because 和 because of：一个接句子，一个接名词。",
        },
        {
          kind: "tip",
          text: "说将来的事，[[quand]] 后面也要用将来时：[[Quand je serai à Québec, je t'appellerai.]] 中文说“等我到了魁北克城”，英语说 When I get to Quebec City（用现在时），法语却要说“当我将在魁北克城”。",
        },
      ],
    },
  ],
};

export default sheet;
