from glob import glob
from os import makedirs
from pathlib import Path
from utilities.minimize import minify_css
from subprocess import run
from rjsmin import jsmin


def prepare_static_files():
    """
    Minimize and generate static files
    from source directories.
    """

    minimize_css_files()
    minimize_js_files()
    copy_assets_directory()


def copy_assets_directory():
    """
    Copy assets directory to static directory.
    """
    source_assets = "src/assets"
    destination_assets = "static/assets"
    makedirs(destination_assets, exist_ok=True)

    assets_files = f"{source_assets}/**/*"
    for asset_file in glob(assets_files, recursive=True):
        if Path(asset_file).is_file():
            destination_file = asset_file.replace(
                source_assets, destination_assets)
            makedirs(Path(destination_file).parent, exist_ok=True)
            with open(asset_file, "rb") as f:
                asset_content = f.read()
            with open(destination_file, "wb") as f:
                f.write(asset_content)


def minimize_js_files():
    """
    Minimize JS files in the src directory.
    """
    js_files = "src/**/*.js"
    for js_file in glob(js_files):
        with open(js_file, "r") as f:
            destination_file = f"static/{str(Path(js_file)
                                             ).replace('src/', '')}"
            js_content = f.read()
        minified_js = jsmin(js_content)
        makedirs(Path(destination_file).parent, exist_ok=True)
        with open(destination_file, "w") as f:
            f.write(minified_js)


def minimize_css_files():
    """
    Minimize CSS files in the src directory.
    """
    makedirs(f"static/design", exist_ok=True)
    css_files = "src/design/*.css"
    for css_file in glob(css_files):
        with open(css_file, "r") as f:
            css_content = f.read()
        minified_css = minify_css(css_content)
        with open(f"static/design/{Path(css_file).name}", "w") as f:
            f.write(minified_css)
