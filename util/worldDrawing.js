function setupDraw(lWidth, phase) {
    Tessellator.pushMatrix();
    GL11.glLineWidth(lWidth);
    GlStateManager.func_179129_p(); // disableCullFace
    GlStateManager.func_179147_l(); // enableBlend
    GlStateManager.func_179112_b(770, 771); // blendFunc
    GlStateManager.func_179132_a(false); // depthMask
    GlStateManager.func_179090_x(); // disableTexture2D

    if (phase) {
        GlStateManager.func_179097_i() // disableDepth
    }
}


function drawWireBox(x, y, z, lWidth = 2.0, red, green, blue, alpha, phase) {
    let w = 1.0;
    let h = 1.0;
    let l = 1.0;
    setupDraw(lWidth, phase);
    const locations = [
        [
            [0, 0, 0],
            [w, 0, 0],
        ],
        [
            [0, 0, 0],
            [0, 0, l],
        ],
        [
            [w, 0, l],
            [w, 0, 0],
        ],
        [
            [w, 0, l],
            [0, 0, l],
        ],

        [
            [0, h, 0],
            [w, h, 0],
        ],
        [
            [0, h, 0],
            [0, h, l],
        ],
        [
            [w, h, l],
            [w, h, 0],
        ],
        [
            [w, h, l],
            [0, h, l],
        ],

        [
            [0, 0, 0],
            [0, h, 0],
        ],
        [
            [w, 0, 0],
            [w, h, 0],
        ],
        [
            [0, 0, l],
            [0, h, l],
        ],
        [
            [w, 0, l],
            [w, h, l],
        ],
    ];

    locations.forEach((loc) => {
        Tessellator.begin(3).colorize(red, green, blue, alpha);

        Tessellator.pos(x + loc[0][0] - w / 2, y + loc[0][1], z + loc[0][2] - l / 2).tex(0, 0);
        Tessellator.pos(x + loc[1][0] - w / 2, y + loc[1][1], z + loc[1][2] - l / 2).tex(0, 0);

        Tessellator.draw();
    });
    endDraw(phase);
}

function drawFillBox(x, y, z, color, alpha, phase) {
    let w = 1;
    let h = 1;
    let l = 1;
    setupDraw(2.0, phase);
    w /= 2;
    l /= 2;

    Tessellator.begin(GL11.GL_QUADS, false);
    Tessellator.colorize(color.x / 255, color.y / 255, color.z / 255, alpha);

    Tessellator.translate(x, y, z)
        .pos(w, 0, l)
        .pos(w, 0, -l)
        .pos(-w, 0, -l)
        .pos(-w, 0, l)

        .pos(w, h, l)
        .pos(w, h, -l)
        .pos(-w, h, -l)
        .pos(-w, h, l)

        .pos(-w, h, l)
        .pos(-w, h, -l)
        .pos(-w, 0, -l)
        .pos(-w, 0, l)

        .pos(w, h, l)
        .pos(w, h, -l)
        .pos(w, 0, -l)
        .pos(w, 0, l)

        .pos(w, h, -l)
        .pos(-w, h, -l)
        .pos(-w, 0, -l)
        .pos(w, 0, -l)

        .pos(-w, h, l)
        .pos(w, h, l)
        .pos(w, 0, l)
        .pos(-w, 0, l)
        .draw();
    endDraw(phase);
};

function endDraw(phase) {
    GlStateManager.func_179089_o(); // enableCull
    GlStateManager.func_179084_k(); // disableBlend
    GlStateManager.func_179132_a(true); // depthMask
    GlStateManager.func_179098_w(); // enableTexture2D

    if (phase) {
        GlStateManager.func_179126_j(); // enableDepth
    }

    Tessellator.popMatrix();
}

function drawBox(x, y, z, color, Lwidth, alpha) {
    drawFillBox(x, y, z, color, alpha, false)
    drawWireBox(x, y, z, Lwidth, color.x / 255, color.y / 255, color.z / 255, 1.0, false)
}

export default drawBox