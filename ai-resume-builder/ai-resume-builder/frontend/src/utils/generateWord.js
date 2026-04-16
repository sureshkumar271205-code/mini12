import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType, TabStopType, TabStopPosition, BorderStyle, Table, TableRow, TableCell, WidthType, ShadingType, VerticalAlign } from "docx";
import { saveAs } from "file-saver";

export const generateWord = (data, template = 'modern') => {
    const skillsArray = Array.isArray(data.skills)
        ? data.skills
        : (typeof data.skills === 'string' ? data.skills.split(',').filter(s => s.trim()) : []);

    const certsArray = data.certifications 
        ? data.certifications.split('\n').filter(line => line.trim()) 
        : [];

    const COLOR_PRIMARY = template === 'modern' ? "E11D74" : "000000";
    const COLOR_LIGHT = "4B5563";
    const COLOR_WHITE = "FFFFFF";

    let children = [];

    if (template === 'modern') {
        const halfSkills = Math.ceil(skillsArray.length / 2);
        const col1 = skillsArray.slice(0, halfSkills);
        const col2 = skillsArray.slice(halfSkills);

        // --- MODERN TEMPLATE (MATCH WEB PREVIEW) ---
        children = [
            new Table({
                width: { size: 100, type: WidthType.PERCENTAGE },
                borders: { top: { style: BorderStyle.NONE }, bottom: { style: BorderStyle.NONE }, left: { style: BorderStyle.NONE }, right: { style: BorderStyle.NONE }, insideHorizontal: { style: BorderStyle.NONE }, insideVertical: { style: BorderStyle.NONE } },
                rows: [
                    new TableRow({
                        children: [
                            new TableCell({
                                width: { size: 60, type: WidthType.PERCENTAGE },
                                children: [
                                    new Paragraph({
                                        text: (data.fullName || "YOUR NAME").toUpperCase(),
                                        heading: HeadingLevel.HEADING_1,
                                        run: { color: COLOR_PRIMARY, bold: true, size: 48, font: "Inter" }
                                    }),
                                    new Paragraph({
                                        text: (data.currentTitle || "PROFESSIONAL TITLE").toUpperCase(),
                                        run: { color: "#111827", bold: true, size: 28, font: "Inter" }
                                    }),
                                ]
                            }),
                            new TableCell({
                                width: { size: 40, type: WidthType.PERCENTAGE },
                                children: [
                                    new Table({
                                        width: { size: 100, type: WidthType.PERCENTAGE },
                                        borders: { all: { style: BorderStyle.SINGLE, color: COLOR_PRIMARY, size: 4 } },
                                        shading: { fill: "FFF1F2" },
                                        rows: [new TableRow({ children: [new TableCell({ children: [new Paragraph({ text: data.email, alignment: AlignmentType.CENTER, run: { bold: true, size: 16 } })], margins: { top: 100, bottom: 100 } })] })]
                                    }),
                                    new Paragraph({ text: "", spacing: { before: 80 } }),
                                    new Table({
                                        width: { size: 100, type: WidthType.PERCENTAGE },
                                        borders: { all: { style: BorderStyle.SINGLE, color: COLOR_PRIMARY, size: 4 } },
                                        shading: { fill: "FFF1F2" },
                                        rows: [new TableRow({ children: [new TableCell({ children: [new Paragraph({ text: data.phone, alignment: AlignmentType.CENTER, run: { bold: true, size: 16, color: "333333" } })], margins: { top: 100, bottom: 100 } })] })]
                                    }),
                                    new Paragraph({ text: "", spacing: { before: 80 } }),
                                    new Table({
                                        width: { size: 100, type: WidthType.PERCENTAGE },
                                        borders: { all: { style: BorderStyle.SINGLE, color: COLOR_PRIMARY, size: 4 } },
                                        shading: { fill: "FFF1F2" },
                                        rows: [new TableRow({ children: [new TableCell({ children: [new Paragraph({ text: data.location, alignment: AlignmentType.CENTER, run: { bold: true, size: 16, color: COLOR_PRIMARY } })], margins: { top: 100, bottom: 100 } })] })]
                                    })
                                ],
                                margins: { left: 200 }
                            })
                        ]
                    })
                ],
                spacing: { after: 600 }
            }),

            // Summary
            new Paragraph({ text: "SUMMARY", run: { color: COLOR_PRIMARY, bold: true, size: 24 }, border: { bottom: { color: "FBCFE8", space: 4, value: BorderStyle.SINGLE, size: 6 } }, spacing: { after: 120, before: 100 } }),
            new Paragraph({ text: data.profileSummary, spacing: { after: 300 }, run: { size: 22 } }),

            // Experience
            new Paragraph({ text: "EXPERIENCE", run: { color: COLOR_PRIMARY, bold: true, size: 24 }, border: { bottom: { color: "FBCFE8", space: 4, value: BorderStyle.SINGLE, size: 6 } }, spacing: { after: 120, before: 200 } }),
            new Paragraph({
                children: [
                    new TextRun({ text: `${data.jobTitle || data.currentTitle} @ ${data.companyName}`, bold: true, size: 24 }),
                    new TextRun({ text: `\t${data.jobDuration}`, font: "Inter", italic: true, size: 22 }),
                ],
                tabStops: [{ type: TabStopType.RIGHT, position: TabStopPosition.MAX }],
                spacing: { after: 80 }
            }),
            new Paragraph({ text: data.jobLocation, run: { color: COLOR_PRIMARY, italics: true, size: 20 }, spacing: { after: 120 } }),
            ...(data.jobDescription || "").split('\n').filter(l => l.trim()).map(l => 
                new Paragraph({ text: l.replace(/^[•\-\*]\s*/, ''), bullet: { level: 0 }, spacing: { after: 60 }, run: { size: 22 } })
            ),

            // Education
            new Paragraph({ text: "EDUCATION", run: { color: COLOR_PRIMARY, bold: true, size: 24 }, border: { bottom: { color: "FBCFE8", space: 4, value: BorderStyle.SINGLE, size: 6 } }, spacing: { after: 120, before: 400 } }),
            new Paragraph({
                children: [
                    new TextRun({ text: data.course, bold: true, size: 24 }),
                    new TextRun({ text: `\t${data.year}`, italic: true, size: 22 }),
                ],
                tabStops: [{ type: TabStopType.RIGHT, position: TabStopPosition.MAX }],
                spacing: { after: 60 }
            }),
            new Paragraph({ text: `${data.college} | Result: ${data.cgpa}`, run: { size: 22 }, spacing: { after: 300 } }),

            // Skills (TWO COLUMNS)
            new Paragraph({ text: "SKILLS", run: { color: COLOR_PRIMARY, bold: true, size: 24 }, border: { bottom: { color: "FBCFE8", space: 4, value: BorderStyle.SINGLE, size: 6 } }, spacing: { after: 120, before: 400 } }),
            new Table({
                width: { size: 100, type: WidthType.PERCENTAGE },
                borders: { top: { style: BorderStyle.NONE }, bottom: { style: BorderStyle.NONE }, left: { style: BorderStyle.NONE }, right: { style: BorderStyle.NONE }, insideHorizontal: { style: BorderStyle.NONE }, insideVertical: { style: BorderStyle.NONE } },
                rows: [
                    new TableRow({
                        children: [
                            new TableCell({
                                children: col1.map(s => new Paragraph({ text: s, bullet: { level: 0 }, spacing: { after: 40 }, run: { size: 20 } }))
                            }),
                            new TableCell({
                                children: col2.map(s => new Paragraph({ text: s, bullet: { level: 0 }, spacing: { after: 40 }, run: { size: 20 } }))
                            })
                        ]
                    })
                ]
            }),

            // Certifications
            ...(certsArray.length > 0 ? [
                new Paragraph({ text: "CERTIFICATIONS", run: { color: COLOR_PRIMARY, bold: true, size: 24 }, border: { bottom: { color: "FBCFE8", space: 4, value: BorderStyle.SINGLE, size: 6 } }, spacing: { after: 120, before: 300 } }),
                ...certsArray.map(c => new Paragraph({ text: c, bullet: { level: 0 }, spacing: { after: 40 }, run: { size: 20 } }))
            ] : []),
        ];
    } else if (template === 'classic') {
        // --- CLASSIC (CENTERED) ---
        children = [
            new Paragraph({ text: data.fullName, heading: HeadingLevel.TITLE, alignment: AlignmentType.CENTER, run: { font: "Times New Roman" } }),
            new Paragraph({ text: `${data.email} | ${data.phone} | ${data.location}`, alignment: AlignmentType.CENTER, spacing: { after: 400 } }),
            new Paragraph({ text: "PROFESSIONAL SUMMARY", heading: HeadingLevel.HEADING_2, border: { bottom: { value: BorderStyle.SINGLE } } }),
            new Paragraph({ text: data.profileSummary, spacing: { after: 300 } }),
            new Paragraph({ text: "EXPERIENCE", heading: HeadingLevel.HEADING_2, border: { bottom: { value: BorderStyle.SINGLE } } }),
            new Paragraph({ text: `${data.jobTitle} - ${data.companyName}`, bold: true }),
            new Paragraph({ text: data.jobDescription, italics: true, spacing: { after: 300 } }),
            new Paragraph({ text: "EDUCATION", heading: HeadingLevel.HEADING_2, border: { bottom: { value: BorderStyle.SINGLE } } }),
            new Paragraph({ text: `${data.course} - ${data.college} (${data.year})`, spacing: { after: 200 } }),
            new Paragraph({ text: "SKILLS", heading: HeadingLevel.HEADING_2, border: { bottom: { value: BorderStyle.SINGLE } } }),
            new Paragraph({ text: skillsArray.join(", ") })
        ];
    } else {
        // --- CREATIVE (SIDEBAR EFFECT WITH TABLE) ---
        children = [
            new Table({
                width: { size: 100, type: WidthType.PERCENTAGE },
                rows: [
                    new TableRow({
                        children: [
                            new TableCell({
                                width: { size: 30, type: WidthType.PERCENTAGE },
                                shading: { fill: "1E293B", type: ShadingType.CLEAR, color: "FFFFFF" },
                                children: [
                                    new Paragraph({ text: data.fullName, run: { color: "FFFFFF", bold: true, size: 28 }, spacing: { after: 200 } }),
                                    new Paragraph({ text: "CONTACT", run: { color: "3B82F6", bold: true }, spacing: { after: 100 } }),
                                    new Paragraph({ text: data.email, run: { color: "FFFFFF", size: 18 } }),
                                    new Paragraph({ text: data.phone, run: { color: "FFFFFF", size: 18 } }),
                                    new Paragraph({ text: "SKILLS", run: { color: "3B82F6", bold: true, size: 22 }, spacing: { before: 400, after: 100 } }),
                                    ...skillsArray.map(s => new Paragraph({ text: `• ${s}`, run: { color: "FFFFFF", size: 18 } }))
                                ],
                                margins: { top: 400, bottom: 400, left: 200, right: 200 }
                            }),
                            new TableCell({
                                width: { size: 70, type: WidthType.PERCENTAGE },
                                children: [
                                    new Paragraph({ text: "PROFILE", heading: HeadingLevel.HEADING_2, run: { color: "1E293B" } }),
                                    new Paragraph({ text: data.profileSummary, spacing: { after: 400 } }),
                                    new Paragraph({ text: "EXPERIENCE", heading: HeadingLevel.HEADING_2 }),
                                    new Paragraph({ text: data.jobTitle, bold: true }),
                                    new Paragraph({ text: data.companyName, italics: true }),
                                    new Paragraph({ text: data.jobDescription, spacing: { after: 400 } }),
                                ],
                                margins: { top: 400, bottom: 400, left: 400, right: 400 }
                            })
                        ]
                    })
                ]
            })
        ];
    }

    const doc = new Document({
        sections: [{ children }]
    });

    Packer.toBlob(doc).then((blob) => {
        saveAs(blob, `Resume_${data.fullName.replace(/\s+/g, "_")}_${template}.docx`);
    });
};

