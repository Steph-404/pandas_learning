/** Live world position of the assistant, shared with the dev close-up camera. */
export const assistantLive = { x: 1.8, z: -11.4 };

/**
 * Wave hand-off. The character only *requests* a wave; the model owns the
 * duration timer. Timing it in the character counted frames while the GLB was
 * still loading, which ate most of the window before the rig ever appeared -
 * leaving barely a second of gesture on screen.
 */
export const assistantWave = { finished: false };
