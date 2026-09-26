import { ChevronRight } from "lucide-react";

import { type Course, COURSES, ENGLISH_COURSES } from "@/courses";

/** 首页最下面的课件入口，链到 public/ 下的独立页面 */
export function CourseList() {
  return (
    <>
      <CourseGroup
        title="法语四小时课件"
        summary="从零基础到 TCF Canada NCLC 7，每册约 4 小时，幻灯片形式"
        courses={COURSES}
      />
      <CourseGroup
        title="英语四小时课件"
        summary="雅思 6.5 起步，PTE Core 冲刺 CLB 9，幻灯片形式"
        courses={ENGLISH_COURSES}
      />
    </>
  );
}

function CourseGroup({
  title,
  summary,
  courses,
}: {
  title: string;
  summary: string;
  courses: Course[];
}) {
  return (
    <section className="mt-8">
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="text-muted-foreground mt-1 text-sm">{summary}</p>

      <ol className="bg-card mt-3 divide-y rounded-xl border">
        {courses.map((course, i) => (
          <li key={course.href}>
            <a
              href={`${import.meta.env.BASE_URL}${course.href}`}
              className="hover:bg-accent/50 focus-visible:ring-ring/50 flex w-full items-center gap-3 px-4 py-3 text-left transition-colors outline-none first:rounded-t-xl last:rounded-b-xl focus-visible:ring-[3px]"
            >
              <span className="text-muted-foreground w-5 shrink-0 text-sm tabular-nums">
                {i + 1}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block font-medium">
                  {course.title}
                  <span className="text-muted-foreground ml-2 text-xs font-normal">
                    {course.level}
                  </span>
                </span>
                <span className="text-muted-foreground block truncate text-xs">
                  {course.summary}
                </span>
              </span>
              <ChevronRight className="text-muted-foreground size-4 shrink-0" />
            </a>
          </li>
        ))}
      </ol>
    </section>
  );
}
